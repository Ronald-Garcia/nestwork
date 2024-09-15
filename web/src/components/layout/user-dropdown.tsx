import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/use-auth";
import { $router } from "@/lib/router";
import { $avatarUrl } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { openPage } from "@nanostores/router";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"

export function UserDropdownMenu() {
  const { user, logout } = useAuth();
  const avatarUrl = useStore($avatarUrl);
  const navigateToLogin = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    await logout();
    openPage($router, "login");
  };
  const navigateToSetup = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    openPage($router, "onboard");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-[50px] w-[50px] bg-slate-300 rounded-[100px] ">
        <Avatar >
        <AvatarFallback>
          {user && user.name && (user.name[0] + user.name.split(' ')[1][0])}
        </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={navigateToSetup}>
            Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={navigateToLogin}>
            Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu;
