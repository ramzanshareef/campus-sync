"use server";

import { connectDB } from "@/lib/database/connect";
import { getUser } from "@/lib/user/user";
import Student from "@/models/Student.model";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";
import { IStudent } from "@/types/student";
import mongoose from "mongoose";

export const getTotalStudentDetails = async () => {
    let userSession = await getUser();
    if (userSession.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let totalStudents = await Student.find({ college: userSession.user?._id }).countDocuments({});
        return { totalStudents };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export const getAllStudentDetails = async (currentPage: number) => {
    let userSession = await getUser();
    if (userSession.status !== 200 || userSession.user?.role !== "admin") {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        let college = userSession.user._id;
        if (college) {
            let students = await Student.find({ college }).skip((currentPage - 1) * 5).limit(5).select("-password");
            let length = await Student.countDocuments({ college });
            revalidatePath("/users/student/view");
            return { status: 200, students: JSON.parse(JSON.stringify(students)), length };
        }
        let students = await Student.find({}).skip((currentPage - 1) * 5).limit(5).select("-password");
        let length = await Student.countDocuments({ college });
        revalidatePath("/users/student/view");
        return { status: 200, students: JSON.parse(JSON.stringify(students)), length };
    }
    catch (e) {
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
};

export async function createStudent({ student }: { student: IStudent }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    let isAuth = await getUser();
    if (!isAuth || !isAuth.user || isAuth.user?.role !== "admin") {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        mongooseSession.startTransaction();
        const password = student.rollNumber.toString();
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const studentData = {
            name: student.name,
            department: student.department,
            email: student.rollNumber + "@student.cs.com",
            password: hashedPassword,
            semester: student.semester,
            rollNo: student.rollNumber,
            college: isAuth.user._id,
            isNewUser: true,
        };
        let exisUser = await Student.findOne({
            $or: [
                { email: studentData.email },
                { rollNo: studentData.rollNo }
            ]
        });
        if (exisUser) {
            return { status: 400, message: "Student Already Exists" };
        }
        await Student.create([studentData], { session: mongooseSession });
        await mongooseSession.commitTransaction();
        revalidatePath("/users/student/view");
        return { status: 200, message: "Student Created Successfully" };
    } catch (error: any) {
        await mongooseSession.abortTransaction();
        console.log(error.message);
        return { status: 400, message: "Student Creation Failed" };
    }
    finally {
        await mongooseSession.endSession();
    }
}