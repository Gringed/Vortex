import Utils from "@/app/(home)/Utils";
import { Post } from "@/app/src/features/post/Post";
import { getPostView } from "@/app/src/query/post.query";
import { WriteForm } from "@/app/write/WriteForm";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import clsx from "clsx";
import { ObjectId } from "mongodb";

import { notFound } from "next/navigation";
import React from "react";
import { createPostReply } from "./reply/write-reply.action";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PostView({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const session = await getAuthSession();
  let post: any;
  let parentPost: any;
  let user: any;
  if (ObjectId.isValid(params.postId)) {
    post = await getPostView(params.postId, session?.user._id);
    user = await prisma.users.findUnique({
      where: {
        id: session?.user._id,
      },
    });
    if (post?.parentId) {
      parentPost = await getPostView(post?.parentId, session?.user._id);
    }
  } else {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  return (
    <>
      <div
        className="border-r border-l border-accent-foreground"
        style={{ flex: 1 }}
      >
        <div
          className="container backdrop-blur-md bg-gradient-to-t from-background border-b-2 border-secondary z-10 py-6 sticky"
          style={{ top: "75px" }}
        >
          <div className="flex items-center gap-4">
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold">Répondre</h1>
          </div>
        </div>
        {parentPost && (
          <div className="relative">
            <Post post={parentPost} key={parentPost.id} parent={true} />
          </div>
        )}
        <Utils />

        <Post post={post} key={post.id} />
        <div className="">
          <div className="divider div-transparent div-arrow-down"></div>
          <div className="w-full">
            <WriteForm
              user={user}
              onSubmit={async (values) => {
                "use server";
                const result = await createPostReply(parentPost?.id, values);
                return result;
              }}
            />
          </div>
          {post.replies.map((reply: any) => {
            return <Post post={reply} key={reply.id} />;
          })}
        </div>
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </>
  );
}
