import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { GeneralLinks, UsersLinks } from "@/components/dashboard/admin/Links";
import { PanelRightClose } from "lucide-react";
import { UserButton } from "@/components/ui/user";

export default async function AdminDashboard() {
    return (
        <>
            <Sheet>
                <header className="absolute top-0 z-50 ">
                    <nav className="flex flex-col p-4 bg-gray-800 w-fit h-screen">
                        <Link href="/" className="flex items-center justify-center gap-4">
                            <Image
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt=""
                                height={32}
                                width={32}
                                priority={false}
                            />
                            <span className="text-lg font-semibold leading-6 text-white">
                                Campus Sync
                            </span>
                        </Link>
                        <SheetTrigger className="lg:hidden px-4 py-3">
                            <PanelRightClose className="w-6 h-6 text-white/85" />
                        </SheetTrigger>
                        <span className="mt-4 text-xs text-gray-500">
                            GENERAL
                        </span>
                        <GeneralLinks />
                        <span className="mt-4 text-xs text-gray-500">
                            USERS
                        </span>
                        <UsersLinks />
                        <UserButton />
                    </nav>
                    <SheetContent side="left">
                        <SheetTitle>
                            <Link href="/" className="flex items-center justify-center gap-4">
                                <Image
                                    className="h-8 w-auto"
                                    src="/logo.svg"
                                    alt="Campus Sync Logo"
                                    height={32}
                                    width={32}
                                    priority={false}
                                />
                                <span className="text-lg font-semibold leading-6 hover:text-gray-600">
                                    Campus Sync
                                </span>
                            </Link>
                        </SheetTitle>
                        <SheetDescription>
                            This is me
                        </SheetDescription>
                    </SheetContent>
                </header>
            </Sheet>
        </>
    );
}