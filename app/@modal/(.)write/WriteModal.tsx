'use client';


import { WriteForm, WritePostFormType } from '@/app/write/WriteForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { users } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

export const WriteModal = ({
  user,
  createPost,
}: {
  user: users;
  createPost: (values: WritePostFormType) => Promise<string | void>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname?.includes('/write')}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WriteForm
          user={user}
          onSubmit={async (values) => {
            const result = await createPost(values);
            return result;
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
