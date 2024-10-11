"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IUser } from "@/types/user";
import { UserButtonClient } from "../ui/user-client";

export function SidebarContent({ isAuth, user }: { isAuth: boolean, user: IUser }) {
    const pathname = usePathname();
    return <>
        <span className="mt-4 text-xs text-gray-400">
            GENERAL
        </span>
        <div className="my-2 space-y-0 text-gray-500">
            <Link className={` flex items-center gap-4 p-2 rounded w-48
            ${pathname === "/dashboard" ? "bg-indigo-500 text-white" : "hover:text-black"}`} href="/dashboard"
            >
                <HomeIcon className="w-5 h-5" />
                Dashboard
            </Link>
        </div>
        <div className="fixed bottom-4 text-black md:text-white flex items-center gap-2 text-sm">
            <UserButtonClient
                isAuth={isAuth}
                user={user}
            /> {user.name}
        </div>
    </>;
}