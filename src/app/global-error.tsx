"use client";

import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error, reset: Function }) {
    return (
        <>
            <html>
                <body>
                    <div className="flex items-center justify-center h-screen w-screen">
                        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                            <h1 className="text-[7rem] font-bold leading-tight">{error.name}</h1>
                            <span className="font-medium">Oops! Something went wrong {":)"}</span>
                            <p className="text-center text-muted-foreground">
                                We apologize for the inconvenience. <br /> Please try again later.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <Button variant="primary" onClick={() => reset()}>
                                    Try Again
                                </Button>
                                <Link href="/" className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 h-10 px-4 py-2">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}

GlobalError.propTypes = {
    error: PropTypes.instanceOf(Error),
    reset: PropTypes.func.isRequired,
};