import React from "react";

const Post = ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  return <div>{params.postId}</div>;
};

export default Post;
