"use server";

import { connectDB } from "@/lib/database/connect";
import { isAdmin } from "@/lib/session";
import { getUser } from "@/lib/user/user";
import Faculty from "@/models/Faculty.model";
import { IFaculty } from "@/types/faculty";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";
import College from "@/models/College.model";

export const getTotalFacultyDetails = async () => {
    let userSession = await getUser();
    if (userSession.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        await isAdmin();
        let totalFaculties = await Faculty.find({ college: userSession.user?._id }).countDocuments({});
        let college = await College.findOne({ admin: userSession.user?._id });
        return { status: 200, totalFaculties, maxFaculty: college?.maxFaculty };
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
        let userSession = await getUser();
        let totalFaculty = await Faculty.find({ college: userSession.user?._id }).countDocuments({});
        let college = await College.findOne({ admin: userSession.user?._id });
        if (college && college.maxFaculty && totalFaculty >= college?.maxFaculty) {
            return { status: 400, message: "Max Limit Reached, Please Extend your package or contact support(if you think this is a mistake)" };
        }
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

export async function updateFaculty({ facultyId, faculty }: { facultyId: string, faculty: IFaculty }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        await isAdmin();
        let isAuth = await getUser();
        mongooseSession.startTransaction();
        let exisUser = await Faculty.findOne({ _id: facultyId, college: isAuth.user?._id });
        if (!exisUser) {
            mongooseSession.abortTransaction();
            return { status: 400, message: "Faculty Not Found" };
        }
        await Faculty.updateOne({ _id: facultyId, college: isAuth.user?._id }, faculty);
        revalidatePath("/users/faculty/view");
        await mongooseSession.commitTransaction();
        return { status: 200, message: "Faculty Updated Successfully" };
    }
    catch (error: any) {
        await mongooseSession.abortTransaction();
        return { status: 400, message: "Internal Server Error" };
    } finally {
        await mongooseSession.endSession();
    }
}

export async function deleteFaculty({ facultyId }: { facultyId: string }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        await isAdmin();
        let isAuth = await getUser();
        mongooseSession.startTransaction();
        let exisUser = await Faculty.findOne({
            _id: facultyId,
            college: isAuth.user?._id
        });
        if (!exisUser) {
            await mongooseSession.abortTransaction();
            return { status: 400, message: "Faculty Not Found" };
        }
        await Faculty.deleteOne({ _id: facultyId, college: isAuth.user?._id });
        await mongooseSession.commitTransaction();
        revalidatePath("/users/faculty/view");
        return { status: 200, message: "Faculty Deleted Successfully" };
    } catch (error: any) {
        await mongooseSession.abortTransaction();
        return { status: 400, message: "Internal Server Error" };
    } finally {
        await mongooseSession.endSession();
    }
}