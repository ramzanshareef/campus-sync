import mongoose, { models, Document, Schema } from "mongoose";

export interface FacultyType extends Document {
    college: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    photo: string;
}

const FacultySchema: Schema<FacultyType> = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "College",
    },
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
        required: true,
    },
});

const Faculty = models.Faculty as mongoose.Model<FacultyType> || mongoose.model<FacultyType>("Faculty", FacultySchema);

export default Faculty;