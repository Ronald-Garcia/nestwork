import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { $router } from "@/lib/router";
import { openPage } from "@nanostores/router";
import AddDeckDialog from "../deck/add-deck-dialog";
import AddCardDialog from "../card/add-card";

const Sidebar = () => {
  const page = useStore($router);

  const navigateHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPage($router, "home");
  };

  return (
    <div className="flex flex-col items-end p-2 space-y-2">
      <Button
        aria-label={"Home"}
        variant="ghost"
        size="icon"
        onClick={navigateHome}
      >
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button aria-label={"Search"} variant="ghost" size="icon">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {page && page.route === "home" && <AddDeckDialog />}

      {page && page.route === "deck" && (
        <AddCardDialog deckId={parseInt(page.params.deckId)} />
      )}
    </div>
  );
};

export default Sidebar;
