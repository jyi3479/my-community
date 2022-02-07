import React from "react";
import { CommentList, CommentWrite, Post } from "../components";

import { useSelector } from "react-redux";

const PostDetail = (props) => {
  // 리덕스에서 클릭한 게시물 정보 가져오기
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((state) => state.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);

  const post = post_list[post_idx];

  return (
    <React.Fragment>
      <Post {...post} is_me={post.user_info.user_id === user_info.uid} />
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
