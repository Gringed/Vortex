"use client"
import React from "react";
import {  PostHome } from "../../query/post.query";
import { PostWrapper } from "./PostWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { LikeButton } from "./LikeButton";

type PostProps = {
  post: PostHome;
  parent?: Boolean;
  userId?: String
};
export const Post = ({ post, parent, userId }: PostProps) => {
  
  return (
    <div className={`${!parent && "border-b border-accent-foreground"}`}>
      <PostWrapper
        author={post.user}
        postId={post.id}
        createdAt={post.createdAt}
        parent={parent}
        className={parent ? " shadow-none" : "shadow"}
        userId={userId}
      >
        <Link href={`/posts/${post.id}`} className=" font-light whitespace-pre-line">
          {post.content.split(" ").map((str) => {
            if (str.startsWith("@")) {
              return (
                <span key={str} className={"text-primary"}>
                  <Link href={`/users/${str.split("@")[1]}`}>{str}</Link>{" "}
                </span>
              );
            }
            return str + " ";
          })}
        </Link>
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-2 hover:text-primary transition-all duration-300">
            <Link
              href={`/posts/${post.id}/reply`}
              className="custom-rounded bg-secondary hover:bg-accent text-foreground hover:text-primary p-2 flex gap-1 items-center"
            >
              <MessageCircle style={{ transform: "scaleX(-1)" }} size={20} />
            </Link>
            <div className="text-custom-rounded text-muted-foreground text-sm">
              {post._count.replies}
            </div>
          </div>
          <div className="flex items-center gap-2 hover:text-red-500 transition-all duration-300">
           <LikeButton postId={post.id} isLiked={post.likes.length > 0} />
            <div className="text-custom-rounded text-muted-foreground text-sm">
              {post._count.likes}
            </div>
          </div>
          <div className="flex items-center gap-2 hover:text-purple-500 transition-all duration-300">
            <Link
              href={`#`}
              className="custom-rounded bg-secondary hover:bg-accent text-foreground hover:text-purple-500 p-2 flex gap-1 items-center"
            >
              <Share style={{ transform: "scaleX(-1)" }} size={20} />
            </Link>
          </div>
        </div>
      </PostWrapper>
    </div>
  );
};
