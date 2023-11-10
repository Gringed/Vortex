import Utils from "@/app/(home)/Utils";
import { Post } from "@/app/src/features/post/Post";
import { getPostView } from "@/app/src/query/post.query";
import { getAuthSession } from "@/lib/auth";
import clsx from "clsx";
import { ObjectId } from "mongodb";

import { notFound } from "next/navigation";
import React from "react";

export default async function PostView({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const session = await getAuthSession();
  let post;
  if (ObjectId.isValid(params.postId)) {
    post = await getPostView(params.postId, session?.user._id);
  } else {
    return notFound();
  }

  if (!post) {
    return notFound();
  }
  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <Utils />
        <Post post={post} key={post.id} />
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </>
  );
}
