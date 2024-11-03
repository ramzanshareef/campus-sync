import { z } from "zod";

export const createFacultySchema = z.object({
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
            message: "Invalid Email",
        }),
});