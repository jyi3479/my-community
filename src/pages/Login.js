import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [is_full, setFull] = React.useState(false);

  const login = () => {
    // 이메일, 패스워드 미기입 시 로그인 버튼 활성화 막기
    if (id === "" || pwd === "") {
      setFull(true);
      // window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요:)");
      return;
    } else {
      setFull(false);
    }

    // 이메일 형식 체크
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="36px" bold>
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
            onSubmit={login}
            is_submit
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            onSubmit={login}
            is_submit
          />
        </Grid>
        <Button
          text="로그인하기"
          _onClick={() => {
            console.log("로그인 했어!");
            login();
          }}
          is_active={is_full}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
