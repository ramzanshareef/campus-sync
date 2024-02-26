/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                "hostname": "res.cloudinary.com",
            }, {
                "hostname": "images.unsplash.com",
            }, {
                "hostname": "tailwindui.com",
            }
        ]
    }
};

export default nextConfig;