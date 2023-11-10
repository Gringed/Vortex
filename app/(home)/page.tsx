import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";
import { getPosts } from "../src/query/post.query";
import { Post } from "../src/features/post/Post";
import Utils from "./Utils";


export const Home = async () => {
  const session = await getAuthSession();

  const posts = await getPosts(undefined);
  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <Utils />
        {posts.map((p) => (
          <Post post={p} key={p.id} />
        ))}
      </div>
      <div className="flex-1  break-all ">
        <h2>J'sais pas encore</h2>
      </div>
    </>
  );
};

export default Home;
