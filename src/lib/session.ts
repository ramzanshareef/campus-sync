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

export const checkSub = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined || session.user?.role !== "sub") {
        return false;
    }
    return true;
};

export const checkAdmin = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined || session.user?.role !== "admin") {
        return false;
    }
    return true;
};

export const checkStudent = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined || session.user?.role !== "student") {
        return false;
    }
    return true;
};

export const checkFaculty = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined || session.user?.role !== "faculty") {
        return false;
    }
    return true;
};

export const checkForRole = async (role: "user" | "sub" | "admin" | "student" | "faculty") => {
    const session = await getSession();
    if (!session) {
        return false;
    }
    if (!session.isAuth || !session.user || !session.user.role) {
        return false;
    }
    if (session.user?.role !== role) {
        return false;
    }
    return true;
};

export const isAdmin = async () => {
    const session = await getSession();
    if (!session || !session.isAuth || session.isAuth === undefined || session.user?.role !== "admin") {
        throw new Error("Unauthorized", {
            cause: "User is not an admin",
        });
    }
    return true;
};