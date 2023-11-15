import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { UserProfile } from "../../src/query/user.query";
import Image from "next/image";

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

type ProfileProps = PropsWithChildren<{
  user: UserProfile;
}>;

export const Profile = ({ user, children }: ProfileProps) => {
  return (
    <>
      <div
        className=" w-full relative h-48 shadow-lg"
        style={
          user?.bannerColor
            ? { background: user?.bannerColor }
            : { background: "black" }
        }
      >
        {user?.banner && (
          <img
            src={user.banner}
            className="w-full h-full object-cover"
            alt="Img profile"
          />
        )}
      </div>
      <div className=" container flex flex-col gap-3">
        <div className="flex justify-between my-4">
          <div className=" -mt-24  relative">
            {user?.userDecoration && <img src={user.userDecoration} width={100} height={100}/>}
          </div>
          <Link
            href="/profile/edit"
            className={
              "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-primary hover:text-accent-foreground h-9 px-4 py-2"
            }
          >
            Editer
          </Link>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="text-gray-600">@{user?.username}</p>
        </div>
        {user.bio ? (
          <p className="text-muted-foreground">{user.bio}</p>
        ) : (
          <p className="text-muted-foreground">no bio</p>
        )}
        <div className="flex items-center gap-2 mt-4">
          {user.followed.map((f) => (
            <div className="flex -space-x-2">
              <Avatar
                size="sm"
                className="border-2 border-background"
                key={f.follower.id}
              >
                {f.follower.image ? (
                  <AvatarImage src={f.follower.image} alt={f.follower.id} />
                ) : null}
                <AvatarFallback>
                  {(
                    f.follower.username[0] + f.follower.username[1]
                  ).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          <p className="text-muted-foreground">
            {user._count.followed} followers
          </p>

          {user.link ? (
            <>
              <Link
                className="text-muted-foreground hover:underline"
                href={user.link}
              >
                {removeHttp(user.link)}
              </Link>
            </>
          ) : null}
        </div>
        {children}
      </div>
    </>
  );
};
