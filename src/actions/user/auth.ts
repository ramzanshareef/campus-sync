"use server";

import { connectDB } from "@/lib/database/connect";
import { getSession } from "@/lib/session";
import User from "@/models/User.model";
import { SignInFormSchema, SignUpFormSchema } from "@/schemas/user";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { sendOTPForSignUp } from "../emails/auth";
import SignUpVerification from "@/models/SignupVerification.model";

export async function userSignup({ name, email, password }: { name: string, email: string, password: string }) {
    const result = SignUpFormSchema.safeParse({
        name,
        email,
        password,
    });
    if (!result.success) {
        let formatted = result.error.format();
        return { status: 400, message: "Validation Error, ", errors: formatted };
    }
    let allowedEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "tomorjerry.com"];
    let emailDomain = (email as string)?.split("@")[1];
    if (!allowedEmailDomains.includes(emailDomain)) {
        return { status: 400, message: "Only Gmail, Yahoo, Hotmail and Outlook domains are allowed" };
    }
    else {
        await connectDB();
        const mongoSession = await mongoose.startSession();
        try {
            mongoSession.startTransaction();
            let user = await User.findOne({ email: email });
            if (user) {
                let otpDoc = await SignUpVerification.findOne({ email });
                if (otpDoc) {
                    let currentTime = new Date().getTime();
                    let otpTime = otpDoc.createdAt.getTime();
                    let diff = Math.abs(currentTime - otpTime) / 60000;
                    if (diff < 2) {
                        await mongoSession.commitTransaction();
                        return { status: 205, message: "OTP already sent, please wait for 2 minutes" };
                    }
                    else {
                        await SignUpVerification.deleteOne({ email });
                    }
                }
                let otpSend = await sendOTPForSignUp({
                    email: email as string,
                    name: name as string
                });
                if (otpSend.status === 200) {
                    await mongoSession.commitTransaction();
                    return { status: 200, message: "OTP sent to email" };
                }
                else {
                    await mongoSession.commitTransaction();
                    return { status: 400, message: "OTP couldnot be sent" };
                }
            }
            else {
                let newUser = new User({
                    name: name,
                    email: email,
                    password: bcryptjs.hashSync(password, 10),
                    isVerified: false,
                });
                await newUser.save();
                await mongoSession.commitTransaction();
                let otpSend = await sendOTPForSignUp({
                    email: email as string,
                    name: name as string
                });
                if (otpSend.status === 200) {
                    return { status: 200, message: "User created successfully, OTP sent to email" };
                }
                else {
                    return { status: 200, message: "User created successfully, OTP couldnot be sent" };
                }
            }
        }
        catch (err) {
            await mongoSession.abortTransaction();
            return { status: 500, message: "Internal server error" };
        }
        finally {
            await mongoSession.endSession();
        }
    }
}

export async function userLogin({ email, password }: { email: string, password: string }) {
    const result = SignInFormSchema.safeParse({
        email,
        password
    });
    if (!result.success) {
        let formatted = result.error.format();
        return { status: 400, message: "Validation Error", errors: formatted };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user && user.isVerified === false) {
                return { status: 400, message: "Email not verified" };
            }
            if (user && user.password) {
                let isMatch = bcryptjs.compareSync(password, user.password);
                if (isMatch) {
                    const session = await getSession();
                    session.isAuth = true;
                    session.user = {
                        _id: user._id as string,
                        name: user.name,
                        email: user.email,
                        photo: user.photo,
                        role: user.role
                    };
                    await session.save();
                    return { status: 200, message: "Login Successful" };
                }
                else {
                    return { status: 400, message: "Invalid Credentials" };
                }
            }
            else {
                return { status: 400, message: "Invalid Credentials" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function verifyOTP({ email, otp }: { email: string, otp: string }) {
    await connectDB();
    let mongoSession = await mongoose.startSession();
    try {
        mongoSession.startTransaction();
        let doc = await SignUpVerification.findOne({ email: email, otp: otp });
        if (doc) {
            await User.updateOne({ email: email }, { $unset: { isVerified: 1 } });
            await SignUpVerification.deleteOne({ email: email, otp: parseInt(otp) });
            await mongoSession.commitTransaction();
            return { status: 200, message: "Email verified successfully" };
        }
        else {
            await mongoSession.commitTransaction();
            return { status: 400, message: "Invalid Credentials" };
        }
    }
    catch (err) {
        await mongoSession.abortTransaction();
        return { status: 500, message: "Internal server error" };
    }
    finally {
        await mongoSession.endSession();
    }
}

export async function userLogout() {
    try {
        await connectDB();
        const session = await getSession();
        session.destroy();
        return { status: 200, message: "Logout Successful" };
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
}