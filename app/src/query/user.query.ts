import { Prisma } from '@prisma/client';
import { cache } from 'react';

import { postSelectQuery } from './post.query';
import { prisma } from '@/lib/prisma';

const userQuery = {
  id: true,
  name: true,
  username: true,
  image: true,
  banner:true,
  bannerColor:true,
  userDecoration:true,
  bio: true,
  createdAt: true,
  link: true,
} satisfies Prisma.usersSelect;

export const getUserProfile = cache((userId: string) => {
  return prisma.users.findFirst({
    where: {
      OR: [
        {
          username: userId
        },
        {
          id: userId
        }
      ]
    },
    select: {
      ...userQuery,
      _count: {
        select: {
          followed:true,
          followers:true,
          likes: true,
        },
      },
      posts: {
        select: {
          ...postSelectQuery(userId),
        },
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      },
      followed: {
        select: {
          follower: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
        take: 3,
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
});

export const getUserEdit = (userId: string) => {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },

    select: {
      ...userQuery,
    },
  });
};

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

export type UserEdit = NonNullable<Prisma.PromiseReturnType<typeof getUserEdit>>;