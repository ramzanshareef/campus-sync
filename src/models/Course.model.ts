import mongoose, { Document, Model, Schema, models } from "mongoose";

export interface CourseI extends Document {
    name: string,
    facultyID: Schema.Types.ObjectId,
    description: string,
    photo: string
}

const CouseSchema: Schema<CourseI> = new Schema({
    name: {
        type: String,
        required: true
    },
    facultyID: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    description: {
        type: String,
        maxlength: 100,
    },
    photo: {
        type: String
    }
});

const Course = models.Course as Model<CourseI> || mongoose.model<CourseI>("Course", CouseSchema);

export default Course;