import { StudentStatsSkeleton } from "@/components/skeletons/Admin";
import { Suspense } from "react";
import { getTotalStudentDetails } from "@/actions/admin/stats";
import { AddStudentButton, ViewStudentsButton } from "@/components/client/btn";

export default async function CollegeStudents() {
    const { totalStudents } = await getTotalStudentDetails();
    return (
        <>
            <Suspense fallback={<StudentStatsSkeleton />} >
                <h1 className="text-3xl font-semibold mb-5">Student Stats</h1>
                <div>
                    <div
                        className="shadow-lg border bg-white w-fit rounded">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Total Students</h2>
                            <p className="text-3xl">{totalStudents}</p>
                        </div>
                    </div>
                </div>
            </Suspense>
            <AddStudentButton />
            <ViewStudentsButton />
        </>
    );
}