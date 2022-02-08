import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
    align,
  } = props;
  //props에 스타일 속성이 아닌 children이 있기 때문에, 스타일 속성들만 따로 넣어줌.
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    align: align,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  align: null,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box; //박스사이즈에 테두리, 패딩 등도 포함하겠다.
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}

${(props) => (props.center ? `text-align: center;` : "")}

${(props) => (props.align === "left" ? `margin-right: auto;` : "")}
${(props) => (props.align === "right" ? `margin-left: auto;` : "")}
`;

export default Grid;
