import { signIn } from "next-auth/react";

import { Post } from "@/app/src/features/post/Post";
import { getAuthSession } from "@/lib/auth";

import { WriteForm } from "@/app/write/WriteForm";
import { getPost } from "@/app/src/query/post.query";
import { createPostReply } from "./write-reply.action";

import { LoginButton } from "@/app/src/features/layout/auth/LoginButton";
import { prisma } from "@/lib/prisma";

const page = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const session = await getAuthSession();

  let user: any;
  if (session) {
    user = await prisma.users.findUnique({
      where: {
        id: session?.user._id,
      },
    });
  }

  const post = await getPost(params.postId, session?.user._id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <Post post={post} key={post.id} />
        {user ? (
          <WriteForm
            user={user}
            onSubmit={async (values) => {
              "use server";
              return createPostReply(post.id, values);
            }}
          />
        ) : (
          <div className="w-full py-5">
            <div className="container flex flex-col gap-3 justify-center items-center">
              <span>Vous devez être connecté pour répondre à ce Layer</span>
              <LoginButton />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </>
  );
};
export default page;
