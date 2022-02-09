import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

// import LogoutIcon from "@material-ui/icons/Logout";
import { Badge } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";

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
        <Grid padding="5px 16px 50px 16px" is_flex>
          <Grid
            _onClick={() => {
              history.push("/");
            }}
          >
            <Text margin="0px" size="24px" bold>
              Hello
            </Text>
          </Grid>

          {/* <Button margin="0 5px">내정보</Button> */}
          <Grid is_flex width="auto">
            <Grid margin="0px 7px">
              <NotiBadge
                _onClick={() => {
                  history.push("/noti");
                }}
              />
            </Grid>

            <LogoutIcon
              onClick={() => {
                dispatch(userActions.logoutFB());
              }}
              color="action"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="5px 16px 70px 16px" is_flex>
        <Grid
          _onClick={() => {
            history.push("/");
          }}
        >
          <Text margin="0px" size="24px" bold>
            Hello
          </Text>
        </Grid>

        <Grid is_flex width="auto">
          <Button
            width="60px"
            padding="7px"
            bg="#61b165"
            margin="0px 10px 0px 0px"
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            width="70px"
            padding="7px"
            bg="#92969a"
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
