import RedirectUnAuth from "@/components/client/RedirectUnAuth";

export default async function FacultyProtectedLayout({ children }: { children: React.ReactNode }) {
    await RedirectUnAuth({ checkIfUserIs: "faculty" });
    return <>
        {children}
    </>;
}