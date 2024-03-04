import { z } from "zod";
export const SignUpFormSchema = z.object({
    firstName: z
        .string({
            message: "First Name is required and must be a String",
        }).min(3, {
            message: "First Name must be at least 3 characters long",
        }),
    lastName: z
        .string({
            message: "Last Name is required and must be a String",
        }).min(3, {
            message: "Last Name must be at least 3 characters long",
        }),
    email: z
        .string({
            message: "Email is required and must be a String",
        }).email({
            message: "Email must be a valid email address",
        }),
    password: z
        .string({
            message: "Password is required and must be a String",
        }).min(6, {
            message: "Password must be at least 6 characters long",
        }),
});
export const SignUpFormOTPVerificationSchema = z.object({
    otp: z
        .string({
            message: "OTP is required and must be a String",
        }).min(6, {
            message: "OTP must be a 6 digit number",
        }),
});
export const SignInFormSchema = z.object({
    email: z
        .string({
            message: "Email is required and must be a String",
        }).email({
            message: "Email must be a valid email address",
        }),
    password: z
        .string({
            message: "Password is required and must be a String",
        }).min(6, {
            message: "Password must be at least 6 characters long",
        }),
});