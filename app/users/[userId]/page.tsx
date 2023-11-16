import { getUserProfile } from "@/app/src/query/user.query";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Metadata, ResolvedMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { Profile } from "./Profile";
import { Button, buttonVariants } from "@/components/ui/button";
import { followUser } from "./follow-action";
import { Post } from "@/app/src/features/post/Post";
import Utils from "@/app/(home)/Utils";

export const generateMetaData = async ({
  params,
}: {
  params: {
    userId: string;
  },
  parent: ResolvedMetadata
}): Promise<Metadata> => {
  
  return {
    title: `Test`
  };
};
export default async function User({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);

  if (!user) {
    notFound();
  }
  const isFollower = session?.user._id
    ? await prisma.follow.findFirst({
        where: {
          followerId: session?.user?._id,
          followingId: user.id,
        },
      })
    : false;

  const isCurrent = session?.user._id === user.id;

  
  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <div
          className="container backdrop-blur-md bg-gradient-to-t from-background border-b-2 border-secondary z-30 py-6 sticky"
          style={{ top: "75px" }}
        >
          <div className="">
            <h1 className="text-2xl font-bold">{user.name}</h1>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <Utils />
          <Profile user={user} />
          <div className="mt-4 border-b border-accent pb-4">
            {isCurrent ? (
              <form>
                <Button
                  formAction={async () => {
                    "use server";
                    await followUser(user.id);
                  }}
                  variant="outline"
                >
                  {isFollower ? "Unfollow" : "Follow"}
                </Button>
              </form>
            ) : null}
          </div>
        </div>
        <div className="divide-y divide-accent">
          {user.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="flex-1  break-all ">
        <h2>{JSON.stringify(session?.user)}</h2>
      </div>
    </>
  );
}
