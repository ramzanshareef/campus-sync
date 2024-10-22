import { z } from "zod";

export const CreateCollegeSchema = z.object({
    name: z
        .string({
            message: "College Name must be a string"
        })
        .min(3, {
            message: "College Name must be atleast 3 characters long"
        }),
    location: z
        .string({
            message: "Location must be a string"
        })
        .min(3, {
            message: "Location must be atleast 3 characters long"
        }),
    logo: z
        .instanceof(File, {
            message: "Logo must be a file"
        })
});