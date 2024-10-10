"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { handleGoogleOAuth } from "@/actions/user/oauth";

export default function GoogleLoginBtn() {
    const router = useRouter();
    const handleGoogle = async (response) => {
        try {
            let res = await handleGoogleOAuth(response.credential);
            if (res.status === 200) {
                router.push("/dashboard");
            } else {
                alert(`Error: ${res.message}`);
                router.push("/login");
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
            router.push("/login");
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.google) {
                clearInterval(interval);
                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
                    callback: handleGoogle,
                });
                google.accounts.id.renderButton(
                    document.getElementById("google-login-btn"),
                    {
                        type: "standard",
                        theme: "outline",
                        size: "large",
                        text: "continue_with",
                        shape: "rectangle",
                        logo_alignment: "center",
                    }
                );
                google.accounts.id.prompt();
            }
        }, 300);
    }, []); //eslint-disable-line

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" />
            <div id="google-login-btn" className="mt-2"></div>
        </>
    );
}