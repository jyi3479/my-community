import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { Post } from "../components";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  // 처음 컴포넌트가 생겼을 때(두번째 인자 빈배열 [])만 데이터를 불러오면 되니까, useEffect
  React.useEffect(() => {
    // 상세페이지에서 메인 이동시 데이터가 하나있을 때가 있으니,
    // 가지고 있는 데이터가 0개(메인에서 그냥 새로고침시), 1개일 때만 새로 데이터 호출로 변경
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          console.log("next!");
          dispatch(postActions.getPostFB(paging.next)); // 3개끊고 4번째 목록이 start로 들어간다.
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          // 로그인을 했고, 포스트를 작성한 유저와 로그인 중인 유저가 같을 때 is_me는 true
          if (user_info && p.user_info.user_id === user_info.uid) {
            return (
              <Grid key={p.id}>
                <Post key={p.id} {...p} is_me />
              </Grid>
            );
          }
          return (
            <Grid key={p.id}>
              <Post {...p} />
            </Grid>
          );
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
