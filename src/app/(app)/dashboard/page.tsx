import { checkAdmin, checkStudent, checkFaculty, checkSub } from "@/lib/session";
import { UserDashboardHome } from "./UserDashboard";
import { SubDashboardHome } from "./SubDashboard";
import AdminDashboardHome from "./AdminDashboard";
import StudentDashboardHome from "./StudentDashboard";
import FacultyDashboardHome from "./FacultyDashboard";

export default async function DashboardPage() {
    const isAdmin = await checkAdmin();
    const isStudent = await checkStudent();
    const isFaculty = await checkFaculty();
    const isSub = await checkSub();
    return <>
        {isSub && <SubDashboardHome />}
        {isAdmin && <AdminDashboardHome />}
        {isStudent && <StudentDashboardHome />}
        {isFaculty && <FacultyDashboardHome />}
        {!isAdmin && !isFaculty && !isStudent && !isSub && <UserDashboardHome />}
    </>;
}