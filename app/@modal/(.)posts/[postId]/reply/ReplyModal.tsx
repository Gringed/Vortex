'use client';


import { WriteForm, WritePostFormType } from '@/app/write/WriteForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { users } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const ReplyModal = ({
  user,
  createPostReply,
}: {
  user: users;
  createPostReply: (values: WritePostFormType) => Promise<string | void>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes('/reply')}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WriteForm
          user={user}
          onSubmit={async (values) => {
            const result = await createPostReply(values);
            return result;
          }}
        />
      </DialogContent>
    </Dialog>
  );
};