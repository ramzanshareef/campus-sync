import mongoose, { Document, models, Schema } from "mongoose";

export interface SignUpVerificationType extends Document {
    email: string;
    otp: Number;
}

const SignInFormSchema: Schema<SignUpVerificationType> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
});

const SignUpVerification = models.SignUpVerification as mongoose.Model<SignUpVerificationType> || mongoose.model<SignUpVerificationType>("SignUpVerification", SignInFormSchema);

export default SignUpVerification;