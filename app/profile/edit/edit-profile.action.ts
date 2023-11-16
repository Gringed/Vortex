'use server';

import { getAuthSession } from '@/lib/auth';
import { ProfileFormType } from './ProfileForm';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const editProfile = async (values: ProfileFormType) => {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be logged in to edit your profile');
  }

  await prisma.users.update({
    where: {
      id: session.user._id,
    },
    data: {
      ...values,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    redirect(`/profile`);
  } catch (error) {
    return `/profile`;
  }
};