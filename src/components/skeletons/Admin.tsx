export const StudentStatsSkeleton = () => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-5">Student Stats</h1>
            <div>
                <div
                    className="shadow-lg border bg-white w-fit rounded-2xl">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Total Students</h2>
                        <p className="text-3xl font-bold">
                            <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export const ViewAllStudentsTableSkeleton = () => {
    return (
        <>
            <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-scroll" id="myProducts">
                <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                    <tr>
                        <th className="px-4 py-1 text-center border">Roll No</th>
                        <th className="px-4 py-1 text-center border">Name</th>
                        <th className="px-4 py-1 text-center border">Branch</th>
                        <th className="px-4 py-1 text-center border">Year (Semester)</th>
                        <th className="px-4 py-1 text-center border">Email ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-x-auto animate-pulse">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <tr
                            key={index}
                            className="w-full border-b py-3 text-sm last-of-type:border-none
                                    [&:first-child>td:first-child]:rounded-tl-lg
                                    [&:first-child>td:last-child]:rounded-tr-lg
                                    [&:last-child>td:first-child]:rounded-bl-lg
                                    [&:last-child>td:last-child]:rounded-br-lg
                                    odd:bg-gray-100 even:bg-gray-200
                                    hover:bg-gray-300 cursor-pointer
                                    transition duration-300 ease-in-out
                                    hover:scale-105 hover:shadow-xl
                                    "
                        >
                            <td className="py-3 pl-6 pr-3 text-center">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export const ViewAllFacultyTableSkeleton = () => {
    return (
        <>
            <table className="max-md:win-w-full md:w-5/6 mx-auto text-gray-900 overflow-x-scroll" id="myProducts">
                <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                    <tr>
                        <th className="px-4 py-5 text-center">Name</th>
                        <th className="px-4 py-5 text-center">Department</th>
                        <th className="px-4 py-5 text-center">Email ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-x-auto animate-pulse">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <tr
                            key={index}
                            className="w-full border-b py-3 text-sm last-of-type:border-none
                                    [&:first-child>td:first-child]:rounded-tl-lg
                                    [&:first-child>td:last-child]:rounded-tr-lg
                                    [&:last-child>td:first-child]:rounded-bl-lg
                                    [&:last-child>td:last-child]:rounded-br-lg
                                    odd:bg-gray-100 even:bg-gray-200
                                    hover:bg-gray-300 cursor-pointer
                                    transition duration-300 ease-in-out
                                    hover:scale-105 hover:shadow-xl
                                    "
                        >
                            <td className="py-3 pl-6 pr-3 text-center">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                            <td className="text-center px-4">
                                <div className="w-16 h-4 ml-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};