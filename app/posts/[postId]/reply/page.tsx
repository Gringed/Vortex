import { signIn } from "next-auth/react";

import { Post } from "@/app/src/features/post/Post";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WriteForm } from "@/app/write/WriteForm";
import { getPost } from "@/app/src/query/post.query";
import { createPostReply } from "./write-reply.action";

const page = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const session = await getAuthSession();

  if (!session?.user._id) {
    await signIn();
    return null;
  }

  const user = await prisma.users.findUnique({
    where: {
      id: session?.user._id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const post = await getPost(params.postId, session.user._id);

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
        <WriteForm
          user={user}
          onSubmit={async (values) => {
            "use server";
            return createPostReply(post.id, values);
          }}
        />
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </>
  );
};
export default page;
