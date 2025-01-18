import AddCourseBtn from "@/components/client/btn";
import { checkFaculty } from "@/lib/session";
import { Metadata } from "next";

export default async function FacultyCoursesPage() {
    return <>
        <div className="flex">
            {await checkFaculty() && <AddCourseBtn />}
            {/* <Suspense fallback={<div>Loading...</div>} >
            <AllCoursesBar
                courses={courses}
            />
        </Suspense> */}
        </div>
    </>;
}

export const metadata: Metadata = {
    title: {
        default: "Courses",
        template: "%s | Campus Sync"
    }
};