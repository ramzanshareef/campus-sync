"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function UnauthorisedError() {
    const router = useRouter();
    return (
        <div className="h-svh">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-[7rem] font-bold leading-tight">401</h1>
                <span className="font-semibold">
                    Oops! You donot have permission to access this page.
                </span>
                <p className="text-center text-muted-foreground">
                    It looks like you tried to access a resource that requires proper authentication. <br />
                    Please log in with the appropriate credentials.
                </p>
                <div className="mt-6 flex gap-4">
                    <Button onClick={() => { router.back(); }} variant="primary">Go Back</Button>
                    <Button onClick={() => router.push("/")} variant="secondary">Go Home</Button>
                </div>
            </div>
        </div>
    );
}