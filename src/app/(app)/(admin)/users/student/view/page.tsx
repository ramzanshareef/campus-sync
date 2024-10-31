import { getAllStudentDetails } from "@/actions/admin/stats";
import { PaginationBar } from "@/components/client/pagination";
import { ViewAllStudentsTableSkeleton } from "@/components/skeletons/Admin";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";

export default async function ViewTotalStudent({ searchParams }: { searchParams: Params }) {
    let currentPage = Number(searchParams?.page || 1);
    const data = await getAllStudentDetails(currentPage);
    if (data.status !== 200) {
        return (
            <>
                <div>
                    Unable to fetch data!!!
                </div>
            </>
        );
    }
    else return (
        <>
            <Suspense fallback={<ViewAllStudentsTableSkeleton />}>
                <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-auto" id="students">
                    <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                        <tr>
                            <th className="px-4 py-1 text-center border">Roll No</th>
                            <th className="px-4 py-1 text-center border">Name</th>
                            <th className="px-4 py-1 text-center border">Branch</th>
                            <th className="px-4 py-1 text-center border">Year (Semester)</th>
                            <th className="px-4 py-1 text-center border">Email ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white overflow-x-auto">
                        {
                            data?.students?.length === 0 &&
                            <tr>
                                <td colSpan={5} className="text-center py-3">
                                    No students found
                                </td>
                            </tr>
                        }
                        {data?.students?.map((student: any, index: number) => (
                            <tr
                                key={index}
                                className="text-sm text-gray-900 border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 pl-6 pr-3 text-center">
                                    {student.rollNo}
                                </td>
                                <td className="text-center px-4">
                                    {student.name}
                                </td>
                                <td className="text-center px-4">
                                    {student.department}
                                </td>
                                <td className="text-center px-4">
                                    {Math.ceil(student.semester / 2)} ({student.semester})
                                </td>
                                <td className="text-center px-4">
                                    {student.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationBar
                    itemsLength={data?.length || 0}
                    currentPage={currentPage}
                    tableID="students"
                />
            </Suspense>
        </>
    );
}