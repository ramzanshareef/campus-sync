"use server";

import { connectDB } from "@/lib/database/connect";
import { getUser } from "@/lib/user/user";
import Student from "@/models/Student.model";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";
import { IStudent, IStudentView } from "@/types/student";
import mongoose from "mongoose";
import { isAdmin } from "@/lib/session";
import College from "@/models/College.model";

export const getTotalStudentDetails = async () => {
    let userSession = await getUser();
    if (userSession.status !== 200) {
        return { status: 401, message: "Unauthorized" };
    }
    try {
        await connectDB();
        await isAdmin();
        let totalStudents = await Student.find({ college: userSession.user?._id }).countDocuments({});
        let college = await College.findOne({ admin: userSession.user?._id });
        return { totalStudents, maxStudents: college?.maxStudents };
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
    try {
        await isAdmin();
        mongooseSession.startTransaction();
        let userSession = await getUser();
        let totalStudents = await Student.find({ college: userSession.user?._id }).countDocuments({});
        let college = await College.findOne({ admin: userSession.user?._id });
        if (college && college.maxStudents && totalStudents >= college?.maxStudents) {
            return { status: 400, message: "Max Limit Reached, Please Extend your package or contact support(if you think this is a mistake)" };
        }
        let isAuth = await getUser();
        const password = student.rollNumber.toString();
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const studentData = {
            name: student.name,
            department: student.department,
            email: student.email,
            password: hashedPassword,
            semester: student.semester,
            rollNo: student.rollNumber,
            college: isAuth?.user?._id,
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

export async function updateStudent({ student }: { student: IStudentView }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        await isAdmin();
        let isAuth = await getUser();
        mongooseSession.startTransaction();
        const studentData = {
            name: student.name,
            department: student.department,
            email: student.email,
            semester: student.semester,
            rollNo: student.rollNo,
        };
        let exisUser = await Student.findOne({
            $or: [
                { email: studentData.email },
                { rollNo: studentData.rollNo },
                { college: isAuth?.user?._id }
            ]
        });
        if (!exisUser) {
            return { status: 400, message: "Student Doesn't Exists" };
        }
        await Student.updateOne({ _id: student._id, college: isAuth?.user?._id }, studentData, { session: mongooseSession });
        await mongooseSession.commitTransaction();
        revalidatePath("/users/student/view");
        return { status: 200, message: "Student Updated Successfully" };
    } catch (error: any) {
        await mongooseSession.abortTransaction();
        return { status: 400, message: "Student Updation Failed - " + error.message };
    }
    finally {
        await mongooseSession.endSession();
    }
}

export async function deleteStudent({ studentId }: { studentId: string }) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        await isAdmin();
        let isAuth = await getUser();
        mongooseSession.startTransaction();
        let exisUser = await Student.findOne({ _id: studentId, college: isAuth?.user?._id });
        if (!exisUser) {
            return { status: 400, message: "Student Doesn't Exists" };
        }
        await Student.deleteOne({ _id: studentId, college: isAuth?.user?._id }, { session: mongooseSession });
        await mongooseSession.commitTransaction();
        revalidatePath("/users/student/view");
        return { status: 200, message: "Student Deleted Successfully" };
    } catch (error: any) {
        await mongooseSession.abortTransaction();
        return { status: 400, message: "Student Deletion Failed - " + error.message };
    }
    finally {
        await mongooseSession.endSession();
    }
}