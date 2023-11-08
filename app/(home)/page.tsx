
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";
import { getPosts } from "../src/query/post.query";
import { Post } from "../src/features/post/Post";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { HomeIcon, PenSquare, User } from "lucide-react";
import "./home.css";
export const Home = async () => {
  const session = await getAuthSession();

  const posts = await getPosts();
  return (
    <div className="flex w-full flex-wrap gap-7">
      <div className="flex-1">
        <div className="container sticky top-32 flex items-end flex-col py-3 max-w-4xl m-auto gap-8">
          <Link
            href={"/"}
            className="custom-rounded mx-1 p-4 bg-secondary hover:bg-primary hover:text-white"
          >
            <HomeIcon size={20} />
          </Link>
          <Link
            href={"/write"}
            className="custom-rounded mx-1 p-4 bg-secondary hover:bg-primary hover:text-white"
          >
            <PenSquare size={20} />
          </Link>
          <Link
            href={"/profile"}
            className="custom-rounded mx-1 p-4 bg-secondary hover:bg-primary hover:text-white"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        {posts.map((p) => (
          <Post post={p} key={p.id} />
        ))}
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </div>
  );
};

export default Home;
