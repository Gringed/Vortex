"use client";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import React, { useTransition } from "react";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Button
        onClick={() => {
          startTransition(() => {
            signIn();
          });
        }}
        className=" font-bold"
      >
        {isPending ? (
          <Loader2 strokeWidth={3} className=" animate-spin mr-2 h-4 w-4" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Login
      </Button>
    </>
  );
};
