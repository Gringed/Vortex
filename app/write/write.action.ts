"use server";

import { redirect } from "next/navigation";
import { WritePostFormType } from "./WriteForm";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export const createPost = async (values: WritePostFormType) => {
  const session = await getAuthSession();

  if (!session?.user._id) {
    throw new Error("You must be logged in to do this.");
  }

  const post = await prisma.post.create({
    data: {
      body: values.content,
      authorId: session.user._id
    },
  });

  // fake timer because sqlite is too fast
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    redirect(`/posts/${post.id}`);
  } catch (error) {
    return `/posts/${post.id}`;
  }
};
