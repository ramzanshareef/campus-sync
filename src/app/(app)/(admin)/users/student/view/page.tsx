import { getAllStudentDetails } from "@/actions/admin/stats";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { StudentsTable } from "./StudentsTable";

export default async function ViewTotalStudent({ searchParams }: { searchParams: Params }) {
    let currentPage = Number(searchParams?.page || 1);
    const data = await getAllStudentDetails(currentPage);
    return <>
        <StudentsTable students={data.students} />
    </>;
}