import React from "react";
import { Grid, Image, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostLayout = (props) => {
  const { align, img_url, contents } = props;
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
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

  if (align === "right") {
    return (
      <Grid is_flex>
        <Grid padding="16px" margin="0px 0px 0px auto">
          <Text>{contents}</Text>
        </Grid>
        <Grid align={align} width="auto">
          <Image shape="square" size={500} src={img_url} />
        </Grid>
      </Grid>
    );
  }

  if (align === "left") {
    return (
      <Grid is_flex>
        <Grid align={align} width="auto">
          <Image shape="square" size={500} src={img_url} />
        </Grid>
        <Grid padding="16px" margin="0px auto 0px 0px">
          <Text>{contents}</Text>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid>
      <Grid padding="16px">
        <Text>{contents}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={img_url} />
      </Grid>
    </Grid>
  );
};

PostLayout.defaultProps = {
  align: null,
  img_url: "",
  contents: "",
};

export default PostLayout;
