import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { UserProfile } from "../../src/query/user.query";
import Image from "next/image";
import { Calendar, CalendarDays, Link2Icon } from "lucide-react";
import { birthdayParse } from "@/app/src/lib/formatDate";

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
      <div className=" container flex flex-col gap-5">
        <div className="flex justify-between mt-4">
          <div className=" -mt-24  relative rounded-full flex justify-center items-center w-36 h-36">
            {user?.image && (
              <img
                className=" rounded-full -ml-2 border-2 border-background"
                src={user.image}
                width={128}
                height={128}
              />
            )}
            {/* {user?.userDecoration && (
              <img
                className="absolute z-20 left-0 -top-1"
                src={user.userDecoration}
                width={144}
                height={144}
              />
            )} */}
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
          <p className="text-muted-foreground">
            Nous ne connaissons pas bien {user.name} . . .
          </p>
        )}
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-start gap-1 justify-center">
            <Link2Icon />
            {user.link ? (
              <>
                <Link
                  className="text-primary hover:underline"
                  href={user.link}
                >
                  {removeHttp(user.link)}
                </Link>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-1 justify-center">
            <CalendarDays />
            {user.link ? (
              <>
                <p>A rejoint Connect le </p>
                {birthdayParse(user.createdAt)}
              </>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 my-4">
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
          <p className="text-foreground">
            {user._count.followed} followers
          </p>
          {user.followers.map((f) => (
            <div className="flex -space-x-2">
              <Avatar
                size="sm"
                className="border-2 border-background"
                key={f.followed.id}
              >
                {f.followed.image ? (
                  <AvatarImage src={f.followed.image} alt={f.followed.id} />
                ) : null}
                <AvatarFallback>
                  {(
                    f.followed.username[0] + f.followed.username[1]
                  ).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          <p className="text-foreground">
            {user._count.followers} abonnements
          </p>
        </div>
        {children}
      </div>
    </>
  );
};
