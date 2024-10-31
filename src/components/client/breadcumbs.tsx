"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCumbs = () => {
    let pathname = usePathname();
    let patharray = pathname.split("/");

    let breadcrumbs = patharray.map((path, index) => {
        let pathUrl = patharray.slice(0, index + 1).join("/");
        let isLast = index === patharray.length - 1;

        return (
            <li
                key={index}
                className={`flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500 hover:text-indigo-600  ${isLast ? "text-blue-600 font-bold" : "mr-2"}`}
            >
                <Link href={pathUrl}>
                    {path.slice(0, 1).toUpperCase() + path.slice(1)}
                </Link>
                {!isLast && (
                    <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
                        &gt;
                    </span>
                )}
            </li>
        );
    });

    return (
        <>
            <nav className="max-md:hidden">
                <ol className="flex flex-wrap items-center w-full px-3 py-1.5 rounded-md bg-gray-200 bg-opacity-60 border border-gray-300 shadow-sm">
                    <li>
                        <Link href="/"
                            className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500"
                        >
                            <HouseIcon
                                className="text-gray-800 hover:text-gray-600"
                                size={20}
                            />
                        </Link>
                    </li>
                    {breadcrumbs}
                </ol>
            </nav>
        </>
    );
};

export default BreadCumbs;