import { AddFacultyButton, ViewFacultyButton } from "@/components/client/btn";
import { getTotalFacultyDetails } from "@/actions/admin/faculties";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UsersRoundIcon } from "lucide-react";

export default async function CollegeFaculty() {
    const { totalFaculties } = await getTotalFacultyDetails();
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-normal flex flex-row justify-between w-full">
                            <span>Total Faculties</span>
                            <UsersRoundIcon size={24} className="ml-2" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalFaculties}</div>
                        <p className="text-xs text-indigo-500">
                            +20.1% from last month
                        </p>
                        <Progress value={totalFaculties as number} variant="primary" rootVariant="primary" type="dynamic" maxValue={10} className="h-2 rounded-sm mt-2" />
                        <span className="text-xs text-black">
                            {totalFaculties}/10
                        </span>
                    </CardContent>
                </Card>
            </div>
            <AddFacultyButton />
            <ViewFacultyButton />
        </>
    );
}