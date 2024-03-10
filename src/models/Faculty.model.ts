import mongoose, { models, Document, Schema } from "mongoose";

export interface FacultyType extends Document {
    clerkID: string;
    college: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
}

const FacultySchema: Schema<FacultyType> = new mongoose.Schema({
    clerkID: {
        type: String,
        required: true,
        unique: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "College",
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
});

const Faculty = models.Faculty as mongoose.Model<FacultyType> || mongoose.model<FacultyType>("Faculty", FacultySchema);

export default Faculty;