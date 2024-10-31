"use client";

import { LogOutIcon, Settings2Icon } from "lucide-react";
import { Button } from "./button";
import { userLogout } from "@/actions/user/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const LogoutButton = ({ className }: { className?: string }) => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    return <>
        <Button
            variant="outline"
            onClick={async () => {
                setIsLoggingOut(true);
                await userLogout().then((res) => {
                    if (res.status === 200) {
                        router.push("/");
                    }
                });
                setIsLoggingOut(false);
            }}
            className={"mt-2 w-1/2 h-6 text-sm p-4" + (className ? ` ${className}` : "")}
        >
            {isLoggingOut ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : <>
                <LogOutIcon className="w-4 h-4 mr-2" />
                Log out
            </>
            }
        </Button>
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