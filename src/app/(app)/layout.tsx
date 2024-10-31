import { SidebarProvider } from "@/components/ui/sidebar";
import NavBar from "@/components/dashboard/Navbar";
import { getUser } from "@/lib/user/user";
import { IUser } from "@/types/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const userData = await getUser();
    return <>
        <SidebarProvider>
            <NavBar user={userData?.user as IUser} isAuth={userData?.isAuth} > {children} </NavBar>
        </SidebarProvider>
    </>;
}