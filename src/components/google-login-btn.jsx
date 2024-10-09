"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { handleGoogleOAuth } from "@/actions/user/oauth";
import { useUserStore } from "@/store/base";

export default function GoogleLoginBtn() {
    const router = useRouter();
    const { setIsAuth, setUser } = useUserStore();
    const handleGoogle = async (response) => {
        try {
            let res = await handleGoogleOAuth(response.credential);
            if (res.status === 200) {
                setUser({
                    name: res.user.name,
                    email: res.user.email,
                    picture: res.user.picture,
                });
                setIsAuth(true);
                router.push("/dashboard");
            } else {
                alert("Login failed");
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
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
                        type: "icon",
                        theme: "outline",
                        size: "large",
                        text: "continue_with",
                        shape: "circle",
                        logo_alignment: "center",
                    }
                );
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