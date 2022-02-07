import React from "react";
import { CommentList, CommentWrite, Post } from "../components";

import { useSelector } from "react-redux";

import { firestore } from "../shared/firebase";

const PostDetail = (props) => {
  // 리덕스에서 클릭한 게시물 정보 가져오기
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  // 리덕스에서 가져오기 때문에 새로고침하면 데이터가 없음 (PostList에서만 firestore에서 가져오고 있음)
  // const post_list = useSelector((state) => state.post.list);

  //  따라서 파이어스토어에서 데이터를 가져오자.
  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post_data = post_list[post_idx];

  // 상세페이지 자체에서 컴포넌트 set을 관리하자.
  const [post, setPost] = React.useState(post_data ? post_data : null);

  React.useEffect(() => {
    if (post) {
      return;
    }

    const postDB = firestore.collection("myPost");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        console.log(doc.data());

        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        setPost(post);
      });
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info.uid} />
      )}
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
