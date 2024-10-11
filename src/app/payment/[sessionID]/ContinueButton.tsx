"use client";

import { makeUserSubAdmin } from "@/actions/payments/admin";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ContinueButton = ({ email }: { email: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <Button variant="primary"
                onClick={async () => {
                    setIsLoading(true);
                    let res = await makeUserSubAdmin(email);
                    if (res.status === 200) {
                        router.push("/dashboard");
                    }
                    setIsLoading(false);
                }}
            >
                {isLoading ?
                    <Loader2Icon className="animate-spin" size={24} />
                    : "Continue to Dashboard"}
            </Button>
        </>
    );
};