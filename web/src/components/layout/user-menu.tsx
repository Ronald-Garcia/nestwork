import { openPage } from "@nanostores/router";
import { Button } from "../ui/button";
import { $router } from "@/lib/router";
import useAuth from "@/hooks/use-auth";

const UserMenu = () => {
  const { user, logout } = useAuth();

  // useEffect(() => {
  //     validate().then(res => {
  //         if (!res) {
  //             redirectPage($router, "login");
  //         }
  //     })
  // }, [])

  const navigateToLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await logout();
    openPage($router, "login");
  };

  return (
    <div className="space-y-2 m-3">
      <div> {`Welcome, ${user.name}`}</div>
      <Button variant="secondary" onClick={navigateToLogin}>
        Sign out
      </Button>
    </div>
  );
};

export default UserMenu;
