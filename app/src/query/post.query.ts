import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPosts = () =>
  prisma.post.findMany({
    take: 20,
    select: {
      id: true,
      createdAt: true,
      authorId: true,
      author: true,
      body: true,
      _count: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    body: true,
    createdAt: true,
    author: {
      select: {
        image: true,
        username: true,
        name: true,
        id: true,
        followeds:true,
        followers:true
      },
    },
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
        userId: userId ?? "error",
      },
    },
  } satisfies Prisma.PostSelect);
export type PostHome = Prisma.PromiseReturnType<typeof getPosts>[number];
