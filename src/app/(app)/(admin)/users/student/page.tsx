import { StudentStatsSkeleton } from "@/components/skeletons/Admin";
import { Suspense } from "react";
import { getTotalStudentDetails } from "@/actions/admin/students";
import { AddStudentButton, ViewStudentsButton } from "@/components/client/btn";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UsersIcon } from "lucide-react";

export default async function CollegeStudents() {
    const { totalStudents, maxStudents } = await getTotalStudentDetails();
    return (
        <>
            <Suspense fallback={<StudentStatsSkeleton />} >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-normal flex flex-row justify-between w-full">
                                <span>Total Students</span>
                                <UsersIcon size={24} className="ml-2" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                            <p className="text-xs text-indigo-500">
                                +20.1% from last month
                            </p>
                            <Progress value={totalStudents as number} variant="primary" rootVariant="primary" type="dynamic" maxValue={maxStudents} className="h-2 rounded-sm mt-2" />
                            <span className="text-xs text-black">
                                {totalStudents}/{maxStudents}
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