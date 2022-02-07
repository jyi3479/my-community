import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

// 세션 체크를 컴포넌트로 만들어서 한번에 쓰자. : 권한 컴포넌트
const Permit = (props) => {
  // 로그인 유지 1. is_login 체크 : 유저 정보가 있는 지, 토큰이 있는 지를 체크
  const is_login = useSelector((state) => state.user.is_login);

  // 로그인 유지 2. session 체크
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // sessionStorage.getItem(_session_key) : 세션 가져오기 함수
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_session && is_login) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
