import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const authRoutes = ["/login", "/signup"];
    const protectedRoutes = ["/dashboard"];

    let isAuth = await checkAuth();

    if (authRoutes.includes(path)) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin).toString());
        }
        return NextResponse.next();
    }

    if (protectedRoutes.includes(path)) {
        if (!isAuth) {
            return NextResponse.redirect(new URL("/login" + "?next=" + path, request.nextUrl.origin).toString());
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};