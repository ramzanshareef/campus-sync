import { checkAuth } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton, ManageAccount } from "./LogoutAndManageAccountButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserButton = async () => {
    const isAuth = await checkAuth();
    return !isAuth ? <>
        <DropdownMenu>
            <DropdownMenuTrigger title="Ramzan Shareef">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                sideOffset={5}
                className="p-4"
            >
                <div className="flex items-center space-x-4 text-base">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-semibold">Ramzan Shareef</h3>
                        <span className="text-sm">ramzan@gmail.com</span>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-4">
                    <ManageAccount />
                    <LogoutButton />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </> : null;
};

export { UserButton };