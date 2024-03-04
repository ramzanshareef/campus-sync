"use client";
import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OauthSignIn() {
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();
    const query = useSearchParams();
    if (!signIn || !signUp) return null;
    const signInWith = (strategy: OAuthStrategy) => {
        return signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sign-up/sso-callback",
            redirectUrlComplete: query.get("redirect_url") || "/",
        });
    };
    async function handleSignIn(strategy: OAuthStrategy) {
        if (!signIn || !signUp) return null;
        const userExistsButNeedsToSignIn = signUp.verifications.externalAccount.status === "transferable" && signUp.verifications.externalAccount.error?.code === "external_account_exists";
        if (userExistsButNeedsToSignIn) {
            const res = await signIn.create({ transfer: true });
            if (res.status === "complete") {
                setActive({
                    session: res.createdSessionId,
                });
            }
        }
        const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable";
        if (userNeedsToBeCreated) {
            const res = await signUp.create({
                transfer: true,
            });
            if (res.status === "complete") {
                setActive({
                    session: res.createdSessionId,
                });
            }
        }
        else {
            signInWith(strategy);
        }
    }
    return (
        <Button variant="destructive" className="w-full" onClick={() => handleSignIn("oauth_google")}>
            Sign In with Google
        </Button>
    );
}