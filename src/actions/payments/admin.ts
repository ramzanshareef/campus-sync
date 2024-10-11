"use server";

import { connectDB } from "@/lib/database/connect";
import Invoice from "@/models/Invoice.model";
import Payment from "@/models/Payment.model";
import User from "@/models/User.model";
import mongoose from "mongoose";
import { sendMadeAdminEmail } from "../emails/auth";
import bcryptjs from "bcryptjs";
import { getSession } from "@/lib/session";

export async function createUserIfNotExists(user: { name: string, email: string, password: string }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        const findUser = await User.findOne({ email: user.email });
        if (!findUser) {
            let newUser = await User.create({
                name: user.name,
                email: user.email,
                password: bcryptjs.hashSync(user.password, 10),
                isNewUser: true
            });
            mongooseSession.commitTransaction();
            return { status: 200, message: "User created successfully", user: JSON.parse(JSON.stringify(newUser)) };
        }
        mongooseSession.commitTransaction();
        return { status: 409, message: "User already exists", user: JSON.parse(JSON.stringify(findUser)) };
    } catch (error: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error " + error.message };
    } finally {
        mongooseSession.endSession();
    }
}

export async function makeUserSub(userID: string) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        const user = await User.findById(new mongoose.Types.ObjectId(userID));
        if (!user) {
            mongooseSession.abortTransaction();
            return { status: 404, message: "User not found" };
        }
        let userPayment = await Payment.findOne({ payeeID: user._id });
        let userInvoice = await Invoice.findOne({ paidBy: user._id });
        if (userPayment && userInvoice) {
            await User.updateOne({ _id: user._id }, { role: "sub" });
            await User.updateOne({ _id: user._id }, { $unset: { isNewUser: 1 } });
            await sendMadeAdminEmail({
                email: user.email,
                name: user.name,
                amount: userPayment.amount as number,
                packageType: userInvoice.package as string,
                paymentId: userPayment.id,
                isNewUser: user.isNewUser as boolean
            });
            mongooseSession.commitTransaction();
            return { status: 200, message: "User is now an sub-admin" };
        }
        mongooseSession.commitTransaction();
        return { status: 400, message: "User is not eligible to be an sub-admin" };
    } catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error " + err.message };
    }
    finally {
        mongooseSession.endSession();
    }
}

export async function makeUserSubAdmin(email: string) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        const user = await User.findOne({ email });
        if (!user) {
            mongooseSession.abortTransaction();
            return { status: 404, message: "User not found" };
        }
        await user.updateOne({ role: "sub" });
        mongooseSession.commitTransaction();
        const ironSession = await getSession();
        ironSession.isAuth = true;
        ironSession.user = {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
        };
        await ironSession.save();
        return { status: 200, message: "User is now an admin" };
    }
    catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error " + err.message };
    }
    finally {
        mongooseSession.endSession();
    }
}