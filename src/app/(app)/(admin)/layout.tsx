import RedirectUnAuth from "@/components/client/RedirectUnAuth";
import { Metadata } from "next";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
    await RedirectUnAuth({ checkIfUserIs: "admin" });
    return <>
        {children}
    </>;
}

export const metadata: Metadata = {
    title: "Manage Users",
    description: "Manage users in your college",
};