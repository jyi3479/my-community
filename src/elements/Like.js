import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { realtime } from "../shared/firebase";
import { actionCreators as postActions } from "../redux/modules/post";

const Like = (props) => {
  const { post_id } = props;
  const dispatch = useDispatch();
  // const like_list = useSelector((state) => state.like.list);
  const user_id = useSelector((state) => state.user.user.uid); // 접속자 id
  const [is_like, setIsLike] = React.useState(false);

  const likeCheck = () => {
    // const likeDB = realtime.ref(`like/${post_id}/${user_id}`);
    // likeDB.update({ like: true });
    dispatch(postActions.likeFB(post_id, user_id, is_like));
  };

  React.useEffect(() => {
    const likeDB = realtime.ref(`like/${post_id}/${user_id}`);

    likeDB.on("value", (snapshot) => {
      console.log(snapshot.val()?.is_click);
      setIsLike(snapshot.val()?.is_click);
    });
  }, []);

  return (
    <React.Fragment>
      <button
        onClick={likeCheck}
        style={{ backgroundColor: is_like ? "red" : "blue" }}
      >
        좋아요
      </button>
    </React.Fragment>
  );
};

Like.defaultProps = {
  post_id: "",
};

export default Like;
