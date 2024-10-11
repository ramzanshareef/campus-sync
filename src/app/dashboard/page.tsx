import { checkAdmin, checkStudent, checkFaculty, checkSub } from "@/lib/session";
import { UserDashboardHome } from "./UserDashboard";
import { SubDashboardHome } from "./SubDashboard";

export default async function DashboardPage() {
    const isAdmin = await checkAdmin();
    const isStudent = await checkStudent();
    const isFaculty = await checkFaculty();
    const isSub = await checkSub();
    return <>
        {!isAdmin && !isFaculty && !isStudent && !isSub && <UserDashboardHome />}
        {isSub && <SubDashboardHome />}
    </>;
}