import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
// 한번에 import 하기 (elements 폴더에 index.js 파일에서 모두 import 했기 때문)
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
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
};

export default Post;
