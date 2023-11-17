import { getAuthSession } from "@/lib/auth";

import React from "react";
import { getPosts } from "../src/query/post.query";
import { Post } from "../src/features/post/Post";
import Utils from "./Utils";


export const Home = async () => {
  const session = await getAuthSession();

  const posts = await getPosts(session?.user._id);

  
  return (
    <>
      <div
        className="divide-y divide-muted border-r border-l border-secondary"
        style={{ flex: 1 }}
      >
        <div className="container backdrop-blur-md bg-gradient-to-t from-background border-b-2 border-secondary z-10 py-6 sticky" style={{top: "75px"}}>
          <div className="">
            <h1 className="text-2xl font-bold">Accueil</h1>
          </div>
        </div>
        <Utils />
        {posts.map((p) => (
          <Post post={p} key={p.id} userId={session?.user._id}/>
        ))}
      </div>
      <div className="flex-1  break-all ">
        <h2>{JSON.stringify(session?.user)}</h2>
      </div>
    </>
  );
};

export default Home;
