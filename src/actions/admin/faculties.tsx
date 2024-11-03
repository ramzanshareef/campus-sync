"use server";

import { connectDB } from "@/lib/database/connect";
import { isAdmin } from "@/lib/session";
import { getUser } from "@/lib/user/user";
import Faculty from "@/models/Faculty.model";
import { IFaculty } from "@/types/faculty";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";

export const getTotalFacultyDetails = async () => {
    let userSession = await getUser();
    if (userSession.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let totalFaculties = await Faculty.find({ college: userSession.user?._id }).countDocuments({});
        return { status: 200, totalFaculties };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export const getAllFacultyDetails = async (currentPage: number) => {
    let userSession = await getUser();
    if (userSession.status !== 200 || userSession.user?.role !== "admin") {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let college = userSession.user._id;
        if (college) {
            let faculties = await Faculty.find({ college }).skip((currentPage - 1) * 5).limit(5).select("-password");
            let length = await Faculty.countDocuments({ college });
            revalidatePath("/users/faculty/view");
            return { status: 200, faculties: JSON.parse(JSON.stringify(faculties)), length };
        }
        let faculties = await Faculty.find({}).skip((currentPage - 1) * 5).limit(5).select("-password");
        let length = await Faculty.countDocuments({ college });
        revalidatePath("/users/faculty/view");
        return { status: 200, faculties: JSON.parse(JSON.stringify(faculties)), length };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export async function createFaculty({ faculty }: { faculty: IFaculty }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        await isAdmin();
        mongooseSession.startTransaction();
        const adminDetails = await getUser();
        const password = faculty.name.split(" ").join("").toLowerCase();
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const facultyData = {
            name: faculty.name,
            email: faculty.email,
            password: hashedPassword,
            college: adminDetails.user?._id,
        };
        let exisUser = await Faculty.findOne({
            email: faculty.email,
        });
        if (exisUser) {
            return { status: 400, message: "Faculty Already Exists" };
        }
        await Faculty.create([facultyData], { session: mongooseSession });
        await mongooseSession.commitTransaction();
        revalidatePath("/users/faculty/view");
        return { status: 200, message: "Faculty Created Successfully" };
    } catch (error: any) {
        await mongooseSession.abortTransaction();
        console.log(error.message);
        return { status: 400, message: "Internal Server Error" };
    }
    finally {
        await mongooseSession.endSession();
    }
}