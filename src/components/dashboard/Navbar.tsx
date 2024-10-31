"use client";

import {
    BadgeCheck,
    Bell,
    ChevronRight,
    CreditCard,
    HouseIcon,
    Sparkles,
    Users2Icon,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutButton } from "../ui/LogoutAndManageAccountButton";
import { UserButtonClient } from "../ui/user-client";
import { IUser } from "@/types/user";
import Link from "next/link";
import BreadCumbs from "../client/breadcumbs";

const data = {
    nav: [
        {
            role: "user",
            data: [
                {
                    title: "Home",
                    url: "/",
                    icon: HouseIcon,
                    isActive: true,
                    items: [
                        {
                            title: "Dashboard",
                            url: "/dashboard",
                        },
                        {
                            title: "Settings",
                            url: "#",
                        },
                    ],
                }
            ],
        },
        {
            role: "sub",
            data: [
                {
                    title: "Home",
                    url: "/",
                    icon: HouseIcon,
                    isActive: true,
                    items: [
                        {
                            title: "Dashboard",
                            url: "/dashboard",
                        },
                        {
                            title: "Payment",
                            url: "#",
                        },
                        {
                            title: "Settings",
                            url: "#",
                        },
                    ],
                }
            ],
        },
        {
            role: "admin",
            data: [
                {
                    title: "Home",
                    url: "/",
                    icon: HouseIcon,
                    isActive: true,
                    items: [
                        {
                            title: "Dashboard",
                            url: "/dashboard",
                        },
                        {
                            title: "Settings",
                            url: "#",
                        },
                    ],
                },
                {
                    title: "Users",
                    url: "/users",
                    icon: Users2Icon,
                    items: [
                        {
                            title: "Student",
                            url: "/users/student",
                        },
                        {
                            title: "Faculty",
                            url: "/users/faculty",
                        },
                    ],
                }
            ],
        }
    ]
};

export default function NavBar({ children, user, isAuth }: { children: React.ReactNode, user: IUser, isAuth: boolean }) {
    const pathname = usePathname();
    return (
        <>
            <Sidebar variant="inset" collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Image src="/logo.svg" alt="Campus Sybc" width={32} height={32} />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Campus Sync</span>
                                        <span className="truncate text-xs">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest"}</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>General</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.nav.filter((item) => item.role === user?.role)[0]?.data.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip={item.title} className={
                                            pathname === item.url ? "bg-indigo-600 text-white" : "text-gray-900 hover:bg-indigo-600 hover:text-white"}>
                                            <Link href={item.url} >
                                                <item.icon className={pathname === item.url ? "bg-indigo-600 text-white" : "text-gray-900 hover:bg-indigo-600 hover:text-white"} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {item.items?.length ? (
                                            <>
                                                <CollapsibleTrigger asChild className={pathname === item.url ? "bg-indigo-600 text-white" : "text-gray-900 hover:bg-indigo-600 hover:text-white"} >
                                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                        <ChevronRight />
                                                        <span className="sr-only">Toggle</span>
                                                    </SidebarMenuAction>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items?.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton asChild className={pathname === subItem.url ? "bg-indigo-600 text-white" : "text-gray-900 hover:bg-indigo-600 hover:text-white"
                                                                }>
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </>
                                        ) : null}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="bg-transparent hover:bg-transparent focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
                                    >
                                        <Avatar className="h-8 w-8 rounded-full">
                                            <AvatarImage
                                                src={user?.photo}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback className="rounded-full"> {user?.name.split(" ").map((n: string) => n.charAt(0)).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user?.email}
                                            </span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 cursor-pointer px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={user?.photo}
                                                    alt={user?.name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {user?.name.split(" ").map((n: string) => n.charAt(0)).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user?.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                            <Sparkles size={16} />
                                            Upgrade to Pro
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                            <BadgeCheck size={16} />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                            <CreditCard size={16} />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                            <Bell size={16} />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <LogoutButton
                                        className="w-full border-none bg-red-600 text-white hover:bg-red-700 hover:text-white"
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar >
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 sticky top-0 bg-white w-full z-50 shadow-sm">
                    <div className="flex flex-row items-center gap-2 cursor-pointer px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <BreadCumbs />
                    </div>
                    <div className="ml-auto mr-2 mt-1">
                        <UserButtonClient
                            user={user}
                            isAuth={isAuth}
                        />
                    </div>
                    <div className="relative mr-4">
                        <Bell size={20} className="cursor-pointer" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                            3
                        </span>
                    </div>

                </header>
                <div className="p-4">
                    {children}
                </div>
            </SidebarInset>
        </>
    );
}