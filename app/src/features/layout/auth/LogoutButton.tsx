"use client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(() => {
          signOut();
        });
      }}
      className=" cursor-pointer"
    >
      {isPending ? (
        <Loader2 strokeWidth={3} className=" animate-spin mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      LooOut
    </DropdownMenuItem>
  );
};
