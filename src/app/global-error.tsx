"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error, reset: Function }) {
    const router = useRouter();
    return (
        <>
            <html>
                <body>
                    <div className="flex items-center justify-ce    nter h-screen w-screen">
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
                                <Button variant="outline" onClick={() => router.back()}>
                                    Go Back
                                </Button>
                                <Button onClick={() => router.push("/")}>Back to Home</Button>
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