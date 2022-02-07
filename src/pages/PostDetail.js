import React from "react";
import { CommentList, CommentWrite, Post } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Permit from "../shared/Permit";

const PostDetail = (props) => {
  // 리덕스에서 클릭한 게시물 정보 가져오기
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }
    // post 정보 없으면 리덕스에서 firestore에 특정 게시물 불러오는 함수 dispatch
    // 리덕스에서 불러오면 리듀서에서 store에 저장할 것임. -> 그럼 위에 post_list에 데이터 들어감
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
