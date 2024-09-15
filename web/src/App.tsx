import { useState } from "react";
import "./index.css";
import { useStore } from "@nanostores/react";
import { $router } from "./lib/router";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Sidebar from "./components/layout/sidebar";
import Body from "./components/layout/body";
import { Toaster } from "./components/ui/toaster";
import UserMenu from "./components/layout/user-menu";
import Onboarding from "./components/pages/onboarding";

function App() {

  const page = useStore($router);

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        404 Not Found
      </div>
    );
  }

  if (page.route === "login" || page.route === "register") {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        {page.route === "login" && <Login />}
        {page.route === "register" && <Register />}
      </div>
    );
  } else if (page.route === "onboard") { 
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <Onboarding></Onboarding>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh">
      <div className="flex-1 min-w-[70px] max-w-[400px]">
        <Sidebar />
      </div>
      <div className="w-full max-w-[800px] mx-auto place-self-end">
        {page.route === "home" && <Body/>}
      </div>
      <div className="flex-1">
        <UserMenu />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
