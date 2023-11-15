import Link from "next/link";
import { notFound } from "next/navigation";
import { Profile } from "../users/[userId]/Profile";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "../src/query/user.query";
import { buttonVariants } from "@/components/ui/button";
import { Post } from "../src/features/post/Post";
import Utils from "../(home)/Utils";

export default async function User({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getAuthSession();

  if (!session?.user._id) {
    notFound();
  }

  const user = await getUserProfile(session.user._id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <div
          className="container backdrop-blur-md bg-gradient-to-t from-background border-b-2 border-secondary z-10 py-6 sticky"
          style={{ top: "75px" }}
        >
          <div className="">
            <h1 className="text-2xl font-bold">Profil</h1>
          </div>
        </div>
        <div className="">
          <Utils />
          <Profile user={user} />
          
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
