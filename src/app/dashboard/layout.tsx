import { checkAdmin, checkStudent, checkFaculty } from "@/lib/session";
import { Metadata } from "next";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isAdmin = await checkAdmin();
    const isStudent = await checkStudent();
    const isFaculty = await checkFaculty();
    return <>
        {isAdmin && <AdminDashboard />}
        {isFaculty && <FacultyDashboard />}
        {isStudent && <StudentDashboard />}
        {!isAdmin && !isFaculty && !isStudent && <UserDashboard />}
        <div className="md:pl-60 md:pr-4 p-4 max-md:pt-16 h-screen overflow-auto">
            {children}
        </div>
    </>;
}

export const metadata: Metadata = {
    title: "Dashboard",
};