import { z } from "zod";

export const createStudentSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
        }).min(3, {
            message: "Name should be atleast 3 characters long",
        }).max(50, {
            message: "Name should be atmost 50 characters long",
        }).regex(/^[a-zA-Z ]+$/, {
            message: "Name should contain only alphabets",
        }),
    email: z
        .string({
            required_error: "Email is required",
        }).email({
            message: "Invalid email address",
        }),
    department: z
        .string({
            required_error: "Department is required",
        }),
    semester: z
        .string({
            required_error: "Semester is required",
        }).min(1, {
            message: "Semester should be atleast 1",
        }).max(8, {
            message: "Semester should be atmost 8",
        }),
    rollNumber: z.string().transform((v) => Number(v) || 0)
});