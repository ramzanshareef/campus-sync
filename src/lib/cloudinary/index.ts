import { CloudinaryApiKey, CloudinaryApiSecret, CloudinaryCloudName } from "@/lib/constants";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: CloudinaryCloudName,
    api_key: CloudinaryApiKey,
    api_secret: CloudinaryApiSecret,
});

export default cloudinary;