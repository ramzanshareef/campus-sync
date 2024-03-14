import { LoaderCircle } from "lucide-react";
import Image from "next/image";
export default function Loading() {
    return <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
        <Image
            src="/logo.svg"
            alt="Campus Sync Logo"
            height={32}
            width={32}
            priority={false}
            className="h-40 animate-pulse w-auto"
        />
        <LoaderCircle className="h-8 w-8 animate-spin text-indigo-500" />
    </div>;
}