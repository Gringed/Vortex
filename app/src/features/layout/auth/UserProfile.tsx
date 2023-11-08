import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = async () => {
  const session = await getAuthSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="w-12 h-12">
        {session?.user?.image ? (
          <AvatarImage  src={session?.user?.image} alt={session?.user._id} />
        ) : null}
        <AvatarFallback>
          {session?.user.name?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <User2 className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
