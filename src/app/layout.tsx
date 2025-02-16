import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
    subsets: ["vietnamese"],
    weight: "400",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Campus Sync",
        default: "Campus Sync",
    },
    description: "Campus Sync is a platform for Colleges to manage students, faculties, and courses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} antialiased`}
            >
                <NextTopLoader
                    color="#000fff"
                    showSpinner={false}
                />
                <Toaster
                />
                {children}
            </body>
        </html>
    );
}