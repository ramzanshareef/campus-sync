/* eslint-disable indent */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const PackageButton = ({ packageType }: { packageType: string }) => {
    const router = useRouter();
    let href: string;
    switch (packageType) {
        case "LITE":
            href = "https://buy.stripe.com/test_00g9AAdMC9Gl5iwcMM";
            break;
        case "STANDARD":
            href = "https://buy.stripe.com/test_7sI288fUK5q55iw5kl";
            break;
        case "PREMIUM":
            href = "https://buy.stripe.com/test_4gweUUaAq19P3ao9AC";
            break;
        default:
            break;
    }
    return <Button variant="primary" className="mt-auto group gap-2"
        onClick={() => {
            router.push(href);
        }}
    >
        Get Started
        <span className="group-hover:translate-x-3 transition-transform duration-300 ease-in-out">
            --&gt;
        </span>
    </Button>;
};