import { StudentStatsSkeleton } from "@/components/skeletons/Admin";
import { Suspense } from "react";
import { getTotalStudentDetails } from "@/actions/admin/stats";
import { AddStudentButton, ViewStudentsButton } from "@/components/client/btn";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function CollegeStudents() {
    const { totalStudents } = await getTotalStudentDetails();
    return (
        <>
            <Suspense fallback={<StudentStatsSkeleton />} >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-normal">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                            <p className="text-xs text-indigo-500">
                                +20.1% from last month
                            </p>
                            <Progress value={totalStudents as number} variant="primary" rootVariant="primary" type="dynamic" maxValue={100} className="h-2 rounded-sm mt-2" />
                            <span className="text-xs text-black">
                                {totalStudents}/100
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </Suspense>
            <AddStudentButton />
            <ViewStudentsButton />
        </>
    );
}


export const metadata: Metadata = {
    title: "Manage Students",
    description: "Manage students in your college",
};