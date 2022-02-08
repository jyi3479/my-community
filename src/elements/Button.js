import React from "react";
import styled from "styled-components";
// import { Text, Grid } from "./index";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    bg,
    is_active,
    padding,
  } = props;
  const styles = {
    margin: margin,
    padding: padding,
    width: width,
    bg: bg,
  };

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} disabled={is_active}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  bg: "#61b165",
  padding: "12px 0px",
  is_active: false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  cursor: pointer;
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
