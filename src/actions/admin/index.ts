"use server";

import { connectDB } from "@/lib/database/connect";
import { packages } from "@/lib/packages";
import { getSession } from "@/lib/session";
import College from "@/models/College.model";
import Invoice from "@/models/Invoice.model";
import User from "@/models/User.model";
import mongoose from "mongoose";
import { uploadImage } from "../upload/image";

export async function createCollege(formData: FormData) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        const session = await getSession();
        if (!session || session.isAuth !== true || session.user?.role !== "sub") {
            mongooseSession.commitTransaction();
            return { status: 401, message: "Unauthorized" };
        }
        const name = formData.get("name");
        const location = formData.get("location");
        const user = await User.findById(session.user._id);
        if (!user) {
            mongooseSession.commitTransaction();
            return { status: 404, message: "User not found" };
        }
        if (user.role !== "sub") {
            mongooseSession.commitTransaction();
            return { status: 401, message: "Unauthorized" };
        }
        const invoice = await Invoice.findOne({
            paidBy: user._id,
            status: "paid"
        });
        if (!invoice) {
            mongooseSession.commitTransaction();
            return { status: 400, message: "Please purchase a package to create a college" };
        }
        const pack = invoice.package;
        const maxStudents = packages.find(p => p.package === pack)?.maxStudents;
        const maxFaculty = packages.find(p => p.package === pack)?.maxFaculty;
        if (!maxStudents || !maxFaculty) {
            mongooseSession.commitTransaction();
            return { status: 400, message: "Invalid package" };
        }
        let res = await uploadImage(formData, "logo");
        await College.create({
            name,
            location,
            logo: res.imageURL,
            maxStudents,
            maxFaculty,
            admin: user._id
        });
        mongooseSession.commitTransaction();
        await makeUserAdmin();
        return { status: 200, message: "College created successfully" };

    } catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error" + err.message };
    }
    finally {
        mongooseSession.endSession();
    }
}

export async function makeUserAdmin() {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        const session = await getSession();
        mongooseSession.startTransaction();
        const userSession = await getSession();
        if (!userSession) {
            return { status: 401, message: "Unauthorized" };
        }
        if (userSession.user) {
            userSession.user.role = "admin";
        }
        await userSession.save();
        const user = await User.findOne({ email: session?.user?.email });
        if (!user) {
            mongooseSession.commitTransaction();
            return { status: 404, message: "User not found" };
        }
        user.role = "admin";
        await user.save();
        mongooseSession.commitTransaction();
        return { status: 200, message: "User role updated" };
    } catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error" + err.message };
    } finally {
        mongooseSession.endSession();
    }
}