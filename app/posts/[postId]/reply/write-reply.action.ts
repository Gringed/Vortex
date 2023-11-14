"use server";

import { WritePostFormType } from "@/app/write/WriteForm";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createPostReply = async (
  parentId: string,
  values: WritePostFormType
) => {
  const session = await getAuthSession();

  if (!session?.user._id) {
    throw new Error("You must be logged in to do this.");
  }

  const post = await prisma.post.create({
    data: {
      userId: session.user._id,
      content: values.content,
      parentId: parentId,
      isParent: false
    },
  });

  // fake timer because sqlite is too fast
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    redirect(`/posts/${post.parentId}`);
  } catch (error) {
    return `/posts/${post.parentId}`;
  }
};
