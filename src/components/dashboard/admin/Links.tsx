"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, Mail, GraduationCapIcon, SquareUserRoundIcon } from "lucide-react";

export function GeneralLinks() {
    const pathname = usePathname();
    return <div className="mt-2 space-y-0 text-gray-500">
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard" ? "bg-gray-700 text-white " : "hover:text-black"}
                                    `} href="/dashboard"
        >
            <HomeIcon className="w-5 h-5" />
            Dashboard
        </Link>
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/messages" ? "bg-gray-700 text-white " : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/messages"
        >
            <Mail className="w-5 h-5" />
            Messages
        </Link>
    </div>;
}

export function UsersLinks() {
    const pathname = usePathname();
    return <div className="mt-2 space-y-0 text-gray-500">
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/users" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/users"
        >
            <SquareUserRoundIcon className="w-5 h-5" />
            Faculty
        </Link>
        <Link className={` flex items-center gap-4 p-2 rounded w-48
                                    ${pathname === "/dashboard/students" ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}
                                    `} href="/dashboard/students"
        >
            <GraduationCapIcon className="w-5 h-5" />
            Students
        </Link>
    </div>;
}