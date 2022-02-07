import React from "react";
import { Grid, Image, Text } from "../elements";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;
  return (
    <Grid is_flex padding="16px" margin="8px 0px" bg="white">
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" src={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b> 님이 게시글에 좋아요를 남겼습니다 :)
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
