"use client";
import React, { PropsWithChildren } from "react";
import { PostHome, getPosts } from "../../query/post.query";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { formatDate } from "../../lib/formatDate";
import Link from "next/link";
import "flowbite";

type PostWrapperProps = PropsWithChildren<{
  author: PostHome["user"];
  createdAt?: Date;
  className?: string;
  postId?: string;
  parent?: Boolean;
}>;
export const PostWrapper = ({
  className,
  author,
  createdAt,
  postId,
  children,
  parent,
}: PostWrapperProps) => {

  const postHeader = (
    <div className="flex flex-row items-center justify-between">
      <div className="flex gap-3 items-center">
        <div
          className="flex gap-2 items-center"
          data-popover-target={postId}
          data-tooltip-trigger="hover"
        >
          <Link
            href={`/users/${author.username}`}
            className="text-sm text-foreground font-bold mr-auto"
          >
            {author.name}
          </Link>
          <span className="text-xs text-muted-foreground">
            @{author.username}
          </span>
        </div>
        <div className="flex gap-1 items-center text-sm">
          <span className=" text-xs text-muted-foreground">•</span>
          {createdAt && (
            <Link
              href={`/posts/${postId}`}
              className="text-sm text-muted-foreground"
            >
              {formatDate(new Date(createdAt))}
            </Link>
          )}
        </div>
      </div>
      <div
        data-popover
        id={postId}
        role="tooltip"
        className="absolute z-50 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-500 bg-white border border-muted rounded-lg shadow-slate-400 shadow-sm opacity-0 dark:text-gray-400 dark:bg-secondary dark:shadow-lime-500 dark:border-lime-100"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/users/${author.id}`}>
              <Avatar size="sm">
                {author?.image ? (
                  <AvatarImage src={author?.image} alt={author?.username} />
                ) : null}
                <AvatarFallback>
                  {author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <button
                type="button"
                className="text-white bg-primary focus:ring-4  font-medium rounded-lg text-xs px-3 py-1.5  focus:outline-none dark:focus:ring-blue-800"
              >
                Suivre
              </button>
            </div>
          </div>
          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <a href={`/users/${author.id}`}>{author.name}</a>
          </p>
          <p className="mb-3 text-sm font-normal">
            <a href={`/users/${author.id}`} className="hover:underline">
              @{author.username}
            </a>
          </p>
          <p className="mb-4 text-sm">
            {author.bio
              ? author.bio.split(" ").map((str) => {
                  if (str.startsWith("@")) {
                    return (
                      <span key={str} className={"text-primary"}>
                        <Link href={`/users/${str.split("@")[1]}`}>
                          {str}
                        </Link>{" "}
                      </span>
                    );
                  }
                  return str + " ";
                })
              : " Aucune Bio..."}
          </p>
          <ul className="flex text-sm">
            <li className="mr-2">
              <a href="#" className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {author?._count?.followed}
                </span>
                <span> Following</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {author?._count?.followers}
                </span>
                <span> Followers</span>
              </a>
            </li>
          </ul>
        </div>
        <div data-popper-arrow></div>
      </div>
      <button>
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
  return (
    <>
      <div
        className={clsx(
          "flex item-start w-full flex-row p-6",
          className
        )}
      >
        <div className="relative flex justify-center">
          {parent && (
            <div className="h-5/6 w-0.5 mt-14 absolute m-auto bg-muted-foreground"></div>
          )}
          <Avatar size="sm" className="w-12 h-12 flex">
            {author?.image ? (
              <AvatarImage src={author?.image} alt={author?.username} />
            ) : null}
            <AvatarFallback>
              {author.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-4 flex w-full flex-col gap-2">
          {postId ? <div>{postHeader}</div> : postHeader}
          {children}
        </div>
      </div>
    </>
  );
};
