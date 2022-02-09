import React from "react";
import { Grid, Image, Text, Button, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { Layout } from "../components";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  //이미 App.js에서 세션이 있는지 확인했으니, is_login만 확인하면 된다.
  const is_login = useSelector((state) => state.user.is_login);

  const align = useSelector((state) => state.image.align);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  // 포스트 작성 url에서 params가 있으면(true) 수정하는 페이지라는 의미
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  const [is_full, setFull] = React.useState(false);

  const { history } = props;

  React.useEffect(() => {
    if (is_edit && !_post) {
      // write/ 뒤의 params가 잘못 적혀있으면 _post에 정보가 없을 것이니까
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    if (contents === "" || preview === null) {
      setFull(true);

      // window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요:)");
      return;
    } else {
      setFull(false);
    }
    console.log(is_full);
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(
      postActions.editPostFB(post_id, { contents: contents, align: align })
    );
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            // push는 메인페이지 이동해도 뒤로가기 하면 write 페이지 나올 수 있다.
            // replace는 페이지를 교체해주는 것이기 때문에 메인페이지로 이동해도 뒤로가기 누르면 write 페이지 안나온다.
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid center>
        <Text size="36px" bold margin="0 0 120px 0">
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
      </Grid>

      <Grid is_flex width="auto">
        <Upload />
      </Grid>
      <Grid padding="16px">
        <Layout preview={preview} />
      </Grid>

      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          multiLine
          label="게시글 내용"
          placeholder="게시글 작성"
        />
      </Grid>
      <Grid>
        {is_edit ? (
          <Button
            _onClick={editPost}
            is_active={contents && preview ? false : true}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            _onClick={addPost}
            is_active={contents && preview ? false : true}
          >
            게시글 작성
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
