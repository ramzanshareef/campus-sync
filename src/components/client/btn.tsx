"use client";

import { useRouter } from "next/navigation";

export const AddStudentButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md my-4 mr-2"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/users/student/add");
            }}
        >
            Add Student
        </button>
    );
};

export const ViewStudentsButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md my-4"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/users/student/view");
            }}
        >
            View All Students
        </button>
    );
};

export const AddFacultyButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md my-4 mr-2"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/users/faculty/add");
            }}
        >
            Add Faculty
        </button>
    );
};

export const ViewFacultyButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md my-4"
            onClick={async (e) => {
                e.preventDefault();
                router.push("/users/faculty/view");
            }}
        >
            View All Faculty
        </button>
    );
};

const AddCourseBtn = () => {
    const router = useRouter();
    return (
        <>
            <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded float-right"
                onClick={() => {
                    router.push("/courses/add");
                }}
            >
                Add
            </button>
        </>
    );
};

export default AddCourseBtn;