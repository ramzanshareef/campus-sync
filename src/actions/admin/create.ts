"use server";

import { connectDB } from "@/lib/database/connect";
import Student from "@/models/Student.model";
import { IStudent } from "@/types/student";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";
import { getUser } from "@/lib/user/user";

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
        console.log(password);
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