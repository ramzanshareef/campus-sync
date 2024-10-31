"use client";

import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";

export const PaginationBar = ({ itemsLength, currentPage, tableID }: { itemsLength: number, currentPage: number, tableID: string }) => {
    const noOfItemsPerPage = 5;
    currentPage = Number(currentPage);
    let noOfPages = Math.ceil(itemsLength / noOfItemsPerPage);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <nav
                className="flex items-center justify-between md:flex-row mt-4 pt-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className="font-semibold text-gray-900">
                        {
                            itemsLength === 0 ? "0 - 0" : `${(currentPage - 1) * noOfItemsPerPage + 1} - ${currentPage * noOfItemsPerPage > itemsLength ? itemsLength : currentPage * noOfItemsPerPage}`
                        }
                    </span> of{" "}
                    <span className="font-semibold text-gray-900">
                        {itemsLength}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button
                            className={` flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-500
                            `}
                            disabled={currentPage === 1}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(pathname + `?page=${currentPage - 1}` + "#" + tableID);
                            }}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: noOfPages }, (_, i) => {
                        return (
                            <li key={i}>
                                <button
                                    className={`flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300  ${currentPage === i + 1
                                        ? "bg-white text-green-600 shadow-lg -mt-3 mx-0"
                                        : "hover:bg-gray-100 hover:text-gray-700 m-0"}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(pathname + `?page=${i + 1}` + "#" + tableID);
                                    }}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        );
                    })}
                    <li>
                        <button
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-500"
                            disabled={currentPage === noOfPages || noOfPages === 0}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(pathname + `?page=${currentPage + 1}` + "#" + tableID);
                            }}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

PaginationBar.propTypes = {
    itemsLength: PropTypes.number,
    currentPage: PropTypes.number,
    tableID: PropTypes.string,
};