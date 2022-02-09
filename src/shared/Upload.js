import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, Grid } from "../elements";
import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";
import styled from "styled-components";

const Upload = (props) => {
  const dispatch = useDispatch();
  // 지금 업로드 중인지 확인하는 변수
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();
  const selectFile = (e) => {
    console.log(e.target);
    // input에 가진 files 객체 보기
    console.log(e.target.files);
    // 선택한 파일에 어떻게 저장되어 있나 보기
    console.log(e.target.files[0]);
    // ref로도 확인
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // 파일 내용을 읽어온다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러.
    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  // 파이어베이스 storage에 파일객체로 업로드 하기
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      {/* disabled 속성 주면 파일선택 버튼 안눌린다. */}
      {/* <InputLabel for="input-file">파일 찾기</InputLabel> */}
      <UploadBox>
        <label htmlFor="input-file">
          <Grid bg="#7bc688" padding="1px" margin="5px" center>
            <Text margin="5px" bold size="20px" color="white">
              이미지 선택하기
            </Text>
          </Grid>
        </label>
        <input
          type="file"
          id="input-file"
          // style={{ display: "none" }}
          onChange={selectFile}
          ref={fileInput}
          disabled={is_uploading}
        />
      </UploadBox>
      {/* <Button _onClick={uploadFB}>업로드하기</Button>  */}
    </React.Fragment>
  );
};

// const InputLabel = styled.label`
//   padding: 6px 25px;
//   background-color: #ff6600;
//   border-radius: 4px;
//   color: white;
//   cursor: pointer;
// `;

const UploadBox = styled.label`
  margin: 0 8px 0 8px;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default Upload;
