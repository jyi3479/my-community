import React from "react";
import { CommentList, CommentWrite, Post } from "../components";

const PostDetail = (props) => {
  return (
    <React.Fragment>
      <Post />
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
