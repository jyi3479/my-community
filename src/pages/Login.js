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

  const login = () => {
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
          is_active={id && pwd ? false : true} // 하나라도 input에 value가 없으면 버튼 비활성화
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
