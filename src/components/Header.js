import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

import NotiBadge from "./NotiBadge";

const Header = (props) => {
  const dispatch = useDispatch();

  // 로그인 유지 1. is_login 체크
  // const [is_login, setIsLogin] = React.useState(false);
  const is_login = useSelector((state) => state.user.is_login);

  // 로그인 유지 2. session 체크
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // sessionStorage.getItem(_session_key) : 세션 가져오기 함수
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid padding="4px 16px" is_flex>
          <Grid
            _onClick={() => {
              history.push("/");
            }}
          >
            <Text margin="0px" size="24px" bold>
              Hello
            </Text>
          </Grid>

          <Grid is_flex>
            <Button margin="0 5px">내정보</Button>
            <NotiBadge
              _onClick={() => {
                history.push("/noti");
              }}
            />
            <Button
              margin="0 5px"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="4px 16px" is_flex>
        <Grid>
          <Text margin="0px" size="24px" bold>
            Hello
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            margin="0 5px"
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            margin="0 5px"
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
