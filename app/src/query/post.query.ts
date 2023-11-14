import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPosts = (userId?: string) =>
  prisma.post.findMany({
    take: 20,

    orderBy: {
      createdAt: "desc",
    },
    where: {
      isParent: true,
    },
    select: postSelectQuery(userId),
  });

export const postSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    parentId: true,
    user: {
      select: {
        image: true,
        username: true,
        name: true,
        id: true,
        bio: true,
        link:true,
        _count:{
          select:{
            followed:true,
            followers:true
          }
        }
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

export const getPost = (id: string, userId?: string) =>
  prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      ...postSelectQuery(userId),
    },
  });
export type PostHome = Prisma.PromiseReturnType<typeof getPosts>[number];
