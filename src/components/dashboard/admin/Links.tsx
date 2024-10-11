"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, Mail, UsersRoundIcon, VideoIcon, GraduationCapIcon } from "lucide-react";

export function GeneralLinks() {
    const pathname = usePathname();
    return <div className="mt-2 space-y-0 text-gray-500">
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard" ? "bg-gray-700 text-white font-medium" : "hover:text-black hover:font-medium"}
                                    `} href="/dashboard"
        >
            <HomeIcon className="w-5 h-5" />
            Dashboard
        </Link>
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/messages" ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/messages"
        >
            <Mail className="w-5 h-5" />
            Messages
        </Link>
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/videos" ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/videos"
        >
            <VideoIcon className="w-5 h-5" />
            Videos
        </Link>
    </div>;
}

export function UsersLinks() {
    const pathname = usePathname();
    return <div className="mt-2 space-y-0 text-gray-500">
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/users" ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/users"
        >
            <UsersRoundIcon className="w-5 h-5" />
            Users
        </Link>
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/students" ? "bg-gray-700 text-white font-medium" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/students"
        >
            <GraduationCapIcon className="w-5 h-5" />
            Students
        </Link>
    </div>;
}