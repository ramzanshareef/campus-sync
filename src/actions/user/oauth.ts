"use server";

import { getSession } from "@/lib/session";

export async function handleGoogleOAuth(credentials: any) {
    try {
        const endpoint = "https://oauth2.googleapis.com/tokeninfo";
        const res = await fetch(`${endpoint}?id_token=${credentials}`);
        const data = await res.json();
        if (data.email_verified) {
            const session = await getSession();
            session.isAuth = true;
            session.user = {
                _id: data.sub,
                email: data.email,
                name: data.name,
                role: "user",
            };
            await session.save();
            return {
                status: 200,
                user: {
                    email: data.email,
                    name: data.name,
                    picture: data.picture,
                },
                message: "Successfully authenticated"
            };
        }
        return {
            status: 401,
            message: "Failed to authenticate token"
        };
    }
    catch (err: any) {
        return {
            status: 401,
            message: err.message
        };
    }
};