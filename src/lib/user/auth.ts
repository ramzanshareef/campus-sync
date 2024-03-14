import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/database/connect";
import User from "@/models/User.model";

export async function isAdmin() {
    const { has } = auth();
    return has({
        role: "org:admin"
    });
}

export async function isFaculty() {
    const { has } = auth();
    return has({
        role: "org:faculty"
    });
}

export async function isStudent() {
    const { has } = auth();
    return has({
        role: "org:student"
    });
}

export async function isLoggedIn() {
    const { userId } = auth();
    return !!userId;
}

export async function isSub() {
    const { userId } = auth();
    try {
        await connectDB();
        const user = await User.findOne({ clerkID: userId, role: "admin" });
        if (user === null) return false;
        return true;
    }
    catch (error: any) {
        return false;
    }
}