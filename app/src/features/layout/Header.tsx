import React from "react";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";

import { getAuthSession } from "@/lib/auth";

import { LogoTheme } from "../../theme/LogoTheme";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <>
      <div className="border-b-4 border-b-primary fixed top-0 w-full bg-background z-10">
        <div className="container flex items-center py-3 max-w-4xl m-auto gap-1">
          <LogoTheme />
          {session?.user ? <UserProfile /> : <LoginButton />}
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};
