import React from "react";
import { Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;
  const post_list = useSelector((state) => state.post.list);
  let is_delete = post_list.filter((l) => l.id === post_id).length;
  console.log(is_delete);
  return (
    <Grid
      _onClick={() => {
        if (is_delete === 0) {
          window.alert("포스트가 존재하지 않아요! ;_;");
        } else {
          history.push(`/post/${post_id}`);
        }
      }}
      is_flex
      padding="16px"
      margin="8px 0px"
      bg="white"
    >
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size="10vw" shape="square" src={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b> 님이 게시글에 댓글을 남겼습니다 :)
        </Text>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  image_url:
    "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png",
  user_name: "",
  post_id: null,
};

export default Card;
