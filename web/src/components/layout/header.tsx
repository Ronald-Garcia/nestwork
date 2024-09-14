import { $router } from "@/lib/router";
import { useStore } from "@nanostores/react";

const Header = () => {
  const page = useStore($router);

  if (!page) return null;

  
};

export default Header;
