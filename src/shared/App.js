import "./App.css";
import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
// 리덕스에 저장된 히스토리를 쓰기 위해
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import {
  PostList,
  Login,
  Signup,
  PostDetail,
  PostWrite,
  Notification,
} from "../pages";
import Header from "../components/Header";
import { Grid, Button } from "../elements";
import Permit from "./Permit";
import Search from "./Search";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";

function App() {
  const dispatch = useDispatch();
  // 새로고침할 때, 로그인이 되어있는지 체크하기
  // useEffect 두번째 인자 [] 이렇게 두면서, 한 번만 실행(componentDidMount 역할)

  // session 체크
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    if (is_session) {
      // 세션이 있으면 리덕스에 로그인 체크 보내기
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid padding="20px 100px">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/noti" exact component={Notification} />
          <Route path="/search" exact component={Search} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
