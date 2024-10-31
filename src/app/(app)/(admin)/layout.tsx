import { checkAdmin } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
        redirect("/login");
    }
    return <>
        {children}
    </>;
}