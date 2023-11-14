
import { signIn } from 'next-auth/react';
import { ReplyModal } from './ReplyModal';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPost } from '@/app/src/query/post.query';
import { createPostReply } from '@/app/posts/[postId]/reply/write-reply.action';

export default async function page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
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
    throw new Error('User not found');
  }

  const post = await getPost(params.postId, session.user._id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <ReplyModal
      user={user}
      createPostReply={async (values) => {
        'use server';
        return createPostReply(post.id, values);
      }}
    />
  );
}