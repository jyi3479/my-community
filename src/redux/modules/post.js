import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

// action creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

// initialState (reducer가 사용할 initialstate)
const initialState = {
  list: [],
};

// 게시글 하나에 무엇이 들어가야 하는지
const initialPost = {
  //   id: 0,
  //   user_info: {
  //     user_name: "juyeong",
  //     user_profile:
  //       "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDVfODQg%2FMDAxNjE0OTQ3NjQ2Mjk0.whzNCcFDKx3JdTkoBfMSamHuazaFBhIN0SXMI0fck4Mg.LVFbnLFVUxS6AxDFRzh5lSNyD8jxhOmCrSb7-lkyxSIg.JPEG.acheter_sss%2F%25C0%25CF%25B7%25AF%25BD%25BA%25C6%25AE_%25B6%25F3%25C0%25CC%25BE%25F0_%25B1%25D7%25B8%25AE%25B1%25E2.jpg&type=sc960_832",
  //   },
  image_url:
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDVfODQg%2FMDAxNjE0OTQ3NjQ2Mjk0.whzNCcFDKx3JdTkoBfMSamHuazaFBhIN0SXMI0fck4Mg.LVFbnLFVUxS6AxDFRzh5lSNyD8jxhOmCrSb7-lkyxSIg.JPEG.acheter_sss%2F%25C0%25CF%25B7%25AF%25BD%25BA%25C6%25AE_%25B6%25F3%25C0%25CC%25BE%25F0_%25B1%25D7%25B8%25AE%25B1%25E2.jpg&type=sc960_832",
  contents: "라이언!!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// middleware
const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("myPost");
    const _user = getState().user.user; // state에 있는 user 정보 가져오기
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;
    console.log(_image);
    console.log(typeof _image);
    // 2. 파이어베이스 storage에 문자열로 업로드 하기 : data url string일 경우
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        }) // .then 하면 앞에 끝나고 return한거 가져올 수 있음.
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url }) // firestore에 넣기
            .then((doc) => {
              let post = { ...user_info, ..._post, id: doc.id, image_url: url }; // addPost 함수(리덕스에 저장)에 넣기 위해 + 리덕스 데이터 형식 맞추기
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null)); // 업로드 잘 되었으면 preview 이미지 없애주기
            })
            .catch((err) => {
              window.alert("포스트 작성에 문제가 있어요 ;_;");
              console.log("포스트 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("이미지 업로드에 문제가 있어요 ;_;");
          console.log("이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx]; // 수정하려는 게시글 가져오기

    console.log(_post);

    const postDB = firestore.collection("myPost");

    if (_image === _post.image_url) {
      // 이미지 수정 없을 때 (firestore 데이터만 업데이트 해주면 된다.)
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
      return;
    } else {
      // 이미지 수정 있을 때 (+ 새로운 이미지 storage 업로드)
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("myPost");
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();

        // 키값들을 배열로 만들어준다. ['comment_cnt', 'contents', ..]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        post_list.push(post);

        // let _post = {
        //   id: doc.id,
        //   ...doc.data(),
        // };

        // let post = {
        //   id: doc.id,
        //   user_info: {
        //     user_name: _post.user_name,
        //     user_profile: _post.user_profile,
        //     user_id: _post.user_id,
        //   },
        //   image_url: _post.image_url,
        //   contents: _post.contents,
        //   comment_cnt: _post.comment_cnt,
        //   insert_dt: _post.insert_dt,
        // };

        // post_list.push(post);
      });
      console.log(post_list);

      dispatch(setPost(post_list));
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post); // 앞에 추가하기
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

// export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
