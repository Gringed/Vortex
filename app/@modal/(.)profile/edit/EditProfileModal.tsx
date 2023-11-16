"use client"
import { ProfileForm, ProfileFormType } from "@/app/profile/edit/ProfileForm";
import { LoginButton } from "@/app/src/features/layout/auth/LoginButton";
import { UserEdit } from "@/app/src/query/user.query";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export const EditProfileModal = ({
  user,
  editProfile,
}: {
  user: UserEdit;
  editProfile: (values: ProfileFormType) => Promise<string | void>;
}) => {
  const router = useRouter();

  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("/profile/edit")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        {!user ? (
          <>
            <span>Vous devez être connecté pour modifier votre profil</span>
            <LoginButton />
          </>
        ) : (
          <ProfileForm
            user={user}
            onSubmit={async (values) => {
              const result = await editProfile(values);
              return result;
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
