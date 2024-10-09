import mongoose, { models, Document, Schema } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    photo: string;
    role: string;
    isVerified?: boolean;
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
        required: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
    },
});

const User = models.User as mongoose.Model<UserType> || mongoose.model<UserType>("User", UserSchema);

export default User;