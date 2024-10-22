import mongoose, { models, Document, Schema } from "mongoose";

export interface CollegeType extends Document {
    admin: mongoose.Schema.Types.ObjectId;
    name: string;
    location: string;
    logo: string;
    maxStudents: number;
    maxFaculty: number;
}

const CollegeSchema: Schema<CollegeType> = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    maxStudents: {
        type: Number,
        required: true,
    },
    maxFaculty: {
        type: Number,
        required: true,
    },
});

const College = models.College as mongoose.Model<CollegeType> || mongoose.model<CollegeType>("College", CollegeSchema);

export default College;