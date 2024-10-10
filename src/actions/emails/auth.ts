"use server";

import { EmailTemplateForSignUpOTP, MadeUserAdminPaymentSuccessEmail, MadeUserAdminPaymentSuccessEmailProps } from "@/components/email-templates";
import { Resend } from "resend";
import { RESEND_API_KEY } from "@/lib/constants";
import { connectDB } from "@/lib/database/connect";
import SignUpVerification from "@/models/SignupVerification.model";

const resend = new Resend(RESEND_API_KEY);

export async function sendOTPForSignUp({ email, name }: { email: string, name: string }) {
    try {
        let otp = Math.floor(100000 + Math.random() * 900000);
        const { error } = await resend.emails.send({
            from: "Auth | Campus Sync <campus-sync@ramzanshareef.me>",
            to: email as string,
            subject: "Verify your email address",
            react: EmailTemplateForSignUpOTP({
                email: email as string,
                name: name as string,
                otp: otp,
            })
        });
        if (error) {
            return { status: 500, message: "OTP couldnot be sent" };
        }
        await connectDB();
        await SignUpVerification.create({
            email: email,
            otp: otp,
        });
        return { status: 200, message: "OTP sent successfully" };
    } catch (error) {
        return { status: 500, message: "Internal server error" };
    }
}

export async function sendMadeAdminEmail({ email, name, amount, packageType, paymentId, isNewUser }: MadeUserAdminPaymentSuccessEmailProps) {
    try {
        const { error } = await resend.emails.send({
            from: "Notifications | Campus Sync <campus-sync@ramzanshareef.me>",
            to: email as string,
            subject: "Hurrah! You are now an admin",
            react: MadeUserAdminPaymentSuccessEmail({
                email: email as string,
                name: name as string,
                amount: amount as number,
                packageType: packageType as string,
                paymentId: paymentId as string,
                isNewUser: isNewUser
            })
        });
        if (error) {
            return { status: 500, message: "Email couldnot be sent" };
        }
        return { status: 200, message: "Email sent successfully" };
    }
    catch (error) {
        return { status: 500, message: "Internal server error" };
    }
}