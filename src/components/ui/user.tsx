import { checkAuth } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton, ManageAccount } from "./LogoutAndManageAccountButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/user/user";

const UserButton = async () => {
    const isAuth = await checkAuth();
    const { user } = await getUser();
    return isAuth ? <>
        <DropdownMenu>
            <DropdownMenuTrigger title={user?.name} className="p-0 m-0">
                <Avatar>
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback>{user?.name.split(" ").map(word => word[0].toUpperCase()).join("")}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                sideOffset={5}
                className="p-4 m-0"
            >
                <div className="flex items-center space-x-4 text-base">
                    <Avatar>
                        <AvatarImage src={user?.photo} />
                        <AvatarFallback>{user?.name.split(" ").map(word => word[0].toUpperCase()).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-semibold">{user?.name}</h3>
                        <span className="text-sm">{user?.email}</span>
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