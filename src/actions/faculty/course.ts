"use server";

import { connectDB } from "@/lib/database/connect";
import { checkFaculty } from "@/lib/session";
import Course from "@/models/Course.model";
import { newCourseI } from "@/types/course";
import mongoose from "mongoose";

export async function createCourse(course: newCourseI) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        if (!await checkFaculty()) {
            return {
                status: 403,
                message: "Unauthorized access!",
            };
        }
        const newCourse = new Course(course);
        await newCourse.save({ session: mongooseSession });
        await mongooseSession.commitTransaction();
        return {
            status: 200,
            message: "Course created successfully!",
        };
    }
    catch (err: any) {
        await mongooseSession.abortTransaction();
        return {
            status: 500,
            message: err.message,
        };
    }
    finally {
        mongooseSession.endSession();
    }
}