import React from "react";
import { Grid, Image, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Layout = (props) => {
  const dispatch = useDispatch();
  // const preview = useSelector((state) => state.image.preview);
  const { preview } = props;

  const [checkedInputs, setCheckedInputs] = React.useState(null);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs(id);
    } else {
      setCheckedInputs(null);
    }
  };

  // useEffect를 꼭 사용해야할까..
  React.useEffect(() => {
    dispatch(imageActions.setAlign(checkedInputs));
  }, [checkedInputs]);

  return (
    <Grid>
      <Grid>
        <Grid center>
          <label htmlFor="right"> 이미지 오른쪽 텍스트 왼쪽 </label>
          <input
            type="checkbox"
            id="right"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "right");
            }}
            checked={checkedInputs === "right" ? true : false}
          ></input>
        </Grid>
        <Grid
          is_flex
          border="1px solid #d7d7d7"
          padding="15px"
          margin="15px 0px"
        >
          <Grid center>텍스트</Grid>
          <Grid align="right" width="auto" padding="16px">
            <Image
              shape="square"
              size="40vw"
              src={
                preview
                  ? preview
                  : "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid center>
        <label htmlFor="left"> 이미지 왼쪽 텍스트 오른쪽 </label>
        <input
          type="checkbox"
          id="left"
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, "left");
            console.log(e.currentTarget.checked);
          }}
          checked={checkedInputs === "left" ? true : false}
        ></input>

        <Grid
          is_flex
          border="1px solid #d7d7d7"
          padding="15px"
          margin="15px 0px"
        >
          <Grid align="left" width="auto" padding="16px">
            <Image
              shape="square"
              size="40vw"
              src={
                preview
                  ? preview
                  : "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
              }
            />
          </Grid>
          <Grid center>텍스트</Grid>
        </Grid>
      </Grid>

      <Grid center>
        <label htmlFor="center"> 이미지 상단 텍스트 하단 </label>
        <input
          type="checkbox"
          id="center"
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, "center");
          }}
          checked={checkedInputs === "center" ? true : false}
        ></input>

        <Grid border="1px solid #d7d7d7" padding="15px" margin="15px 0px">
          <Grid padding="16px" width="60vw" margin="auto">
            <Image
              shape="rectangle"
              src={
                preview
                  ? preview
                  : "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
              }
            />
          </Grid>
          <Grid>텍스트</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Layout.defaultProps = { preview: null };

export default Layout;
