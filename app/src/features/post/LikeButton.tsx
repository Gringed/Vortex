'use client';

import { likeAction } from '@/app/posts/[postId]/like.action';
import { Loader } from '@/components/ui/loader';
import clsx from 'clsx';
import { Heart } from 'lucide-react';
import { useTransition } from 'react';

export const LikeButton = ({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked: boolean;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      className={clsx('custom-rounded bg-secondary hover:bg-accent text-foreground hover:text-red-500 p-2 flex gap-1 items-center', {
        'text-red-500': isLiked,
      })}
      onClick={() => startTransition(() => likeAction(postId))}
    >
      {isPending ? <Loader size={20} /> : <Heart size={20} />}
    </button>
  );
};