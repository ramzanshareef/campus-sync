import { z } from "zod";

export const SignUpFormSchema = z.object({
    name: z
        .string({
            message: "Name is required and must be a String",
        }).min(3, {
            message: "Name must be at least 3 characters long",
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
        }).min(8, {
            message: "Password must be at least 6 characters long",
        }).max(20, {
            message: "Password must be at most 20 characters long",
        }),
});

export const SignUpFormOTPVerificationSchema = z.object({
    email: z
        .string({
            message: "Email is required and must be a String",
        }).email({
            message: "Email must be a valid email address",
        }),
    otp: z
        .string({
            message: "OTP is required and must be a String",
        })
        .length(6, {
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
        }).min(8, {
            message: "Password must be at least 6 characters long",
        }).max(20, {
            message: "Password must be at most 20 characters long",
        }),
});