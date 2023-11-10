import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPosts = (userId?: string) =>
  prisma.post.findMany({
    take: 20,
    select: postSelectQuery(userId),

    orderBy: {
      createdAt: "desc",
    },
  });
export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    body: true,
    createdAt: true,
    author: true,
    authorId: true,
    _count: {
      select: {
        likes: true,
        replies: true,
      },
    },
    likes: {
      select: {
        userId: true,
      },
      where: {
        userId: userId ?? undefined,
      },
    },
  } satisfies Prisma.PostSelect);
export const getPostView = (id: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
      replies: {
        select: {
          ...postSelectQuery(userId),
        },
      },

      parent: {
        select: {
          ...postSelectQuery(userId),
        },
      },
    },
  });
export type PostHome = Prisma.PromiseReturnType<typeof getPosts>[number];
