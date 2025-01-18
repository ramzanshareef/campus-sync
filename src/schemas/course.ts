import { z } from "zod";

export const newCourseFormSchema = z.object({
    name: z.string({
        message: "Course Name is required",
    }).min(5, {
        message: "Course Name must be atleast 5 characters long"
    }),
    description: z.string({
        message: "Course Description must be a string"
    }).min(10, {
        message: "Course Description must be atleast 10 characters long"
    }).optional(),
    facultyID: z.string({
        message: "Faculty ID is required"
    }),
    photo: z.string({
        message: "Image URL must be required"
    }).optional()
});