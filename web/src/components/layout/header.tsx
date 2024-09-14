import { $router } from "@/lib/router";
import { $currentPage, $totalCards, $totalDecks } from "@/lib/store";
import { useStore } from "@nanostores/react";

const Header = () => {
  const page = useStore($router);

  const totalDecks = useStore($totalDecks);
  const totalCards = useStore($totalCards);
  const currentPage = useStore($currentPage);

  if (!page) return null;

  if (page.route === "deck" && totalCards > 0) {
    return (
      <div className="flex justify-end gap-3 p-1 border-b text-sm font-medium">
        {(currentPage - 1) * 10 + 1} -{" "}
        {currentPage * 10 > totalCards ? totalCards : currentPage * 10} of{" "}
        {totalCards} card{totalCards === 1 ? "" : "s"}.
      </div>
    );
  } else if (page.route === "home" && totalDecks > 0) {
    return (
      <div className="flex justify-end gap-3 p-1 border-b text-sm font-medium">
        {(currentPage - 1) * 10 + 1} -{" "}
        {currentPage * 10 > totalDecks ? totalDecks : currentPage * 10} of{" "}
        {totalDecks} deck{totalDecks === 1 ? "" : "s"}.
      </div>
    );
  } else {
    return null;
  }
};

export default Header;
