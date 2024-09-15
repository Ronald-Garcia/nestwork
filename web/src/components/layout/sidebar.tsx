import { HomeIcon, MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { $router } from "@/lib/router";
import { openPage } from "@nanostores/router";
import UserDropdownMenu from "./user-dropdown";
import { Separator } from "../ui/separator";
import Conversations from "../conversation/conversations";

const Sidebar = () => {
  const page = useStore($router);

  const navigateHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPage($router, "home");
  };

  return (
    <div className="flex border-2 h-full flex-col items-end justify-between p-2 space-y-2">
      
      <div>
        <div className="text-xl font-bold">
          Conversations
        </div>
        <Conversations></Conversations>
      </div>

        <div className="flex-col space-y-1">
        <Separator className="my-4"></Separator>
        <Button
        aria-label={"Home"}
        variant="ghost"
        size="icon"
        className="w-[50px] h-[50px]"
        onClick={navigateHome}
      >
        <PlusCircledIcon className="w-[80%] h-[80%]" />
      </Button>
        <div className="justify-self-end">
          <UserDropdownMenu></UserDropdownMenu>

        </div>
      </div>


      </div>
  );
};

export default Sidebar;
