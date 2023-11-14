'use server';


import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const followUser = async (userId: string) => {
  const session = await getAuthSession();

  if (!session?.user._id) {
    throw new Error('Not authenticated');
  }

  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: session.user._id,
      followingId: userId,
    },
    select: {
      id: true,
    },
  });

  if (isFollowing) {
    await prisma.follow.delete({
      where: {
        id: isFollowing.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: session.user._id,
        followingId: userId,
      },
    });
  }

  revalidatePath(`/users/${userId}`);
};