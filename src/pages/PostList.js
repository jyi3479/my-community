import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { Post } from "../components";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(post_list);
  console.log(user_info);

  // 처음 컴포넌트가 생겼을 때(두번째 인자 빈배열 [])만 데이터를 불러오면 되니까, useEffect
  React.useEffect(() => {
    // 이미 포스트가 있는 상태에서는 새로 불러오는 것(getPostFB)을 안하도록 하기 - firestore 데이터는 최신 순으로 배치 설정 안했기 때문에
    // 포스트 작성하면 바로 위에 추가되도록 하기 위해서 (이미 있던 리덕스 데이터에 최신 글이 앞에 추가 됨 unshift)
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Post /> */}
      {post_list.map((p, idx) => {
        // 로그인을 했고, 포스트를 작성한 유저와 로그인 중인 유저가 같을 때 is_me는 true
        if (user_info && p.user_info.user_id === user_info.uid) {
          return (
            <Grid key={p.id}>
              <Post {...p} key={p.id} is_me />
            </Grid>
          );
        }
        return (
          <Grid key={p.id}>
            <Post {...p} />
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default PostList;
