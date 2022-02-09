import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
// 한번에 import 하기 (elements 폴더에 index.js 파일에서 모두 import 했기 때문)
import { Button, Grid, Image, Like, PostLayout, Text } from "../elements";
import { Layout } from ".";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
const Post = (props) => {
  const dispatch = useDispatch();
  // const deletePost = () => {
  //   dispatch();
  // };
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                width="auto"
                padding="5px"
                margin="4px"
                bg="grey"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                width="auto"
                padding="5px"
                margin="4px"
                bg="#eb8738"
                _onClick={() => {
                  console.log("삭제!");
                  dispatch(postActions.deletePostFB(props.id, props));
                }}
              >
                삭제
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          <Grid>
            <PostLayout
              align={props.align}
              img_url={props.image_url}
              contents={props.contents}
            />
          </Grid>
        </Grid>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개 좋아요 {props.like_cnt}개
          </Text>
          <Like post_id={props.id} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// 기본적으로 필요한 props를 미리 설정해두는 것
// props가 없어서 오류가 나는 일이 없도록 할 수 있다.
// 단, props를 이상하게 가져왔을 때의 방어는 어려울 것이다.
Post.defaultProps = {
  user_info: {
    user_name: "juyeong",
    user_profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDVfODQg%2FMDAxNjE0OTQ3NjQ2Mjk0.whzNCcFDKx3JdTkoBfMSamHuazaFBhIN0SXMI0fck4Mg.LVFbnLFVUxS6AxDFRzh5lSNyD8jxhOmCrSb7-lkyxSIg.JPEG.acheter_sss%2F%25C0%25CF%25B7%25AF%25BD%25BA%25C6%25AE_%25B6%25F3%25C0%25CC%25BE%25F0_%25B1%25D7%25B8%25AE%25B1%25E2.jpg&type=sc960_832",
  },
  image_url:
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDVfODQg%2FMDAxNjE0OTQ3NjQ2Mjk0.whzNCcFDKx3JdTkoBfMSamHuazaFBhIN0SXMI0fck4Mg.LVFbnLFVUxS6AxDFRzh5lSNyD8jxhOmCrSb7-lkyxSIg.JPEG.acheter_sss%2F%25C0%25CF%25B7%25AF%25BD%25BA%25C6%25AE_%25B6%25F3%25C0%25CC%25BE%25F0_%25B1%25D7%25B8%25AE%25B1%25E2.jpg&type=sc960_832",
  contents: "라이언!!",
  comment_cnt: 10,
  insert_dt: "2022-02-04 10:00:00",
  is_me: false,
};

export default Post;
