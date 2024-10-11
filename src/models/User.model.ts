import mongoose, { models, Document, Schema } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password?: string;
    photo: string;
    role: string;
    isVerified?: boolean;
    googleID?: string;
    provider?: string;
    isNewUser?: boolean;
}

const UserSchema: Schema<UserType> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
        required: true,
        default: process.env.NEXT_PUBLIC_APP_URL + "/images/default-profile-picture.jpg",
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "sub", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
    },
    googleID: {
        type: String,
        unique: true,
    },
    provider: {
        type: String,
        enum: ["google"],
    },
    isNewUser: {
        type: Boolean,
    },
});

const User = models.User as mongoose.Model<UserType> || mongoose.model<UserType>("User", UserSchema);

export default User;