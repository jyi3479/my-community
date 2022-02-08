import React from "react";
import { Grid, Image, Text } from "../elements";

import { useSelector } from "react-redux";

const Layout = (props) => {
  const preview = useSelector((state) => state.image.preview);
  const [checkedInputs, setCheckedInputs] = React.useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
    console.log(checkedInputs);
  };

  return (
    <Grid>
      <Grid>
        <label htmlFor="right"> 이미지 오른쪽 텍스트 왼쪽 </label>
        <input
          type="checkbox"
          id="right"
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, "right");
          }}
          checked={checkedInputs.includes("right") ? true : false}
        ></input>

        <Grid is_flex>
          <div style={{ marginRight: "auto" }}>텍스트</div>
          <Grid align="right" width="auto">
            <Image
              shape="square"
              size={500}
              src={
                preview
                  ? preview
                  : "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png"
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <label htmlFor="left"> 이미지 왼쪽 텍스트 오른쪽 </label>
        <input
          type="checkbox"
          id="left"
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, "left");
          }}
          checked={checkedInputs.includes("left") ? true : false}
        ></input>

        <Grid is_flex>
          <Grid align="left" width="auto">
            <Image
              shape="square"
              size={500}
              src={
                preview
                  ? preview
                  : "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png"
              }
            />
          </Grid>
          <div style={{ marginLeft: "auto" }}>텍스트</div>
        </Grid>
      </Grid>
      <Grid>
        <label htmlFor="center"> 이미지 하단 텍스트 상단 </label>
        <input
          type="checkbox"
          id="center"
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, "center");
          }}
          checked={checkedInputs.includes("center") ? true : false}
        ></input>

        <Grid>
          <div>텍스트</div>
          <Grid>
            <Image
              shape="rectangle"
              src={
                preview
                  ? preview
                  : "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png"
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
