import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSession } from "@/types/session";

export const getSession = async () => {
    const session = await getIronSession<UserSession>(cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: "user-session",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            expires: 60 * 60 * 24 * 5, // 5 days
        },
    });
    return session;
};

export const checkAuth = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined) {
        return false;
    }
    return true;
};