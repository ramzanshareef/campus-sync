import { NewStudentAlert } from "@/components/student/home";
import { getSession } from "@/lib/session";

export default async function StudentDashboard() {
    const session = await getSession();
    return <>
        <div>
            {session.isNewUser && <NewStudentAlert studentName={session?.user?.name as string} />}
            You are logged in as a student with the email {session?.user?.email}
        </div>
    </>;
}