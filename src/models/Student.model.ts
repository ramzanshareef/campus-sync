import mongoose, { models, Document, Schema } from "mongoose";

export interface StudentType extends Document {
    clerkID: string;
    college: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    department: string;
    semester: Number,
    rollNo: Number,
}

const StudentSchema: Schema<StudentType> = new mongoose.Schema({
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
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    rollNo: {
        type: Number,
        required: true,
    },
});

const Student = models.Student as mongoose.Model<StudentType> || mongoose.model<StudentType>("Student", StudentSchema);

export default Student;