"use server";

import { connectDB } from "@/lib/database/connect";
import { getSession } from "@/lib/session";
import User from "@/models/User.model";
import mongoose from "mongoose";

export async function handleGoogleOAuth(credentials: any) {
    await connectDB();
    const mongoSession = await mongoose.startSession();
    try {
        mongoSession.startTransaction();
        const endpoint = "https://oauth2.googleapis.com/tokeninfo";
        const res = await fetch(`${endpoint}?id_token=${credentials}`);
        const data = await res.json();
        if (data.email_verified) {
            const session = await getSession();
            let user = await User.findOne({ email: data.email });
            if (!user) {
                user = await User.create({
                    name: data.name,
                    email: data.email,
                    photo: data.picture,
                    role: "user",
                    provider: "google",
                    googleID: data.sub,
                });
            }
            session.isAuth = true;
            session.user = {
                _id: user._id as string,
                email: user.email,
                name: user.name,
                photo: user.photo,
                role: user.role,
            };
            await session.save();
            await mongoSession.commitTransaction();
            return { status: 200, message: "Successfully authenticated" };
        }
        return { status: 401, message: "Failed to authenticate token" };
    }
    catch (err: any) {
        await mongoSession.abortTransaction();
        return { status: 401, message: err.message };
    }
    finally {
        await mongoSession.endSession();
    }
};