"use server";

import { connectDB } from "@/lib/database/connect";
import { getUser } from "@/lib/user/user";
import Student from "@/models/Student.model";
import { revalidatePath } from "next/cache";

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