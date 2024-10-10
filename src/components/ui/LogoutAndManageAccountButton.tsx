"use client";

import { LogOutIcon, Settings2Icon } from "lucide-react";
import { Button } from "./button";
import { userLogout } from "@/actions/user/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    return <>
        <Button
            variant="outline"
            onClick={async () => {
                await userLogout().then((res) => {
                    if (res.status === 200) {
                        router.push("/");
                    }
                });
            }}
            className="mt-2 w-1/2 h-6 text-sm p-4"
        >
            <LogOutIcon
                className="w-4 h-4 mr-2"
            />
            Log Out</Button>
    </>;
};

const ManageAccount = () => {
    return <>
        <Button
            variant="outline"
            onClick={() => {
                console.log("Manage Account");
            }}
            className="mt-2 w-1/2 h-6 text-sm p-4"
        >
            <Settings2Icon className="w-4 h-4 mr-2" />
            Account</Button>
    </>;
};

export { ManageAccount, LogoutButton };