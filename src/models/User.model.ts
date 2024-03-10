import mongoose, { models, Document, Schema } from "mongoose";

export interface UserType extends Document {
    clerkID: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    role: string;
}

const UserSchema: Schema<UserType> = new mongoose.Schema({
    clerkID: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
});

const User = models.User as mongoose.Model<UserType> || mongoose.model<UserType>("User", UserSchema);

export default User;