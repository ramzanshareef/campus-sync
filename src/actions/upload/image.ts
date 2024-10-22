"use server";

import { CloudinaryApiKey, CloudinaryApiSecret, CloudinaryCloudName } from "@/lib/constants";

export async function uploadImage(formData: FormData, fileField: string) {
    try {
        let data = new FormData();
        data.append("file", formData.get(fileField) as File);
        data.append("api_key", CloudinaryApiKey as string);
        data.append("api_secret", CloudinaryApiSecret as string);
        data.append("upload_preset", "campus-sync-up");
        let response = await fetch(`https://api.cloudinary.com/v1_1/${CloudinaryCloudName}/image/upload`, {
            method: "POST",
            body: data
        });
        let responseData = await response.json();
        return { status: 200, imageURL: responseData.secure_url };
    } catch (error) {
        return { status: 500, message: "Internal Server Error" };
    }
}