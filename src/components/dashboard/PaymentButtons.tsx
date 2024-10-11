/* eslint-disable indent */
"use client";

import { Button } from "@/components/ui/button";
import { packages } from "@/lib/packages";
import { useRouter } from "next/navigation";

export const PackageButton = ({ packageType, email }: { packageType: string, email?: string }) => {
    const router = useRouter();
    let href: string;
    switch (packageType) {
        case "LITE":
            href = email !== undefined && email !== "" ? packages[0].payment_link + `?prefilled_email=${email}` : packages[0].payment_link;
            break;
        case "STANDARD":
            href = email !== undefined && email !== "" ? packages[1].payment_link + `?prefilled_email=${email}` : packages[1].payment_link;
            break;
        case "PREMIUM":
            href = email !== undefined && email !== "" ? packages[2].payment_link + `?prefilled_email=${email}` : packages[2].payment_link;
            break;
        default:
            break;
    }
    return <Button variant="primary" className="mt-auto group gap-2 flex items-center justify-center"
        onClick={() => {
            router.push(href);
        }}
    >
        Get Started
        <span aria-hidden="true" className="text-lg group-hover:translate-x-3 transition-transform duration-300 ease-in-out">&rarr;</span>
    </Button>;
};