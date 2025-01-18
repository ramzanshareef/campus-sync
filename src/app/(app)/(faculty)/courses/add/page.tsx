import { AddCourseForm } from "@/components/forms/facultyForms";
import { getUser } from "@/lib/user/user";
import { IUser } from "@/types/user";

export default async function AddCoursePage() {
    const { user } = await getUser();
    return <>
        <AddCourseForm user={user as IUser} />
    </>;
}