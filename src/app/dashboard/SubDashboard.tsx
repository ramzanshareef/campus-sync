import { CreateCollegeForm } from "@/components/dashboard/sub/forms";

export async function SubDashboardHome() {
    return <>
        <h2 className="text-2xl font-semibold mb-4">
            Please fill out the form below to create a new college and start using the platform...
        </h2>
        <CreateCollegeForm />
    </>;
}