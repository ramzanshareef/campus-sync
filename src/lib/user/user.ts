"use server";

import { getSession } from "@/lib/session";

export async function getUser() {
    try {
        const session = await getSession();
        return {
            status: 200,
            user: session.user,
            isAuth: true,
            message: "User found"
        };
    }
    catch (err) {
        return {
            status: 404,
            isAuth: false,
            user: null,
            message: "User not found"
        };
    }
}