import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { FacultyTable } from "./FacultyTable";
import { getAllFacultyDetails } from "@/actions/admin/faculties";

export default async function ViewTotalStudent({ searchParams }: { searchParams: Params }) {
    let currentPage = Number(searchParams?.page || 1);
    const data = await getAllFacultyDetails(currentPage);
    return <>
        <FacultyTable faculties={data.faculties} />
    </>;
}