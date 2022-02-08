import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";

import { actionCreators as imageActions } from "./image";
import { CenterFocusStrong } from "@material-ui/icons";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// action creators
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({
  post_id,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState (reducer가 사용할 initialstate)
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
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
  insert_dt: moment().format("YYYY-MM-DD kk:mm:ss"),
  align: "center",
};

// middleware
const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("myPost");
    const _user = getState().user.user; // state에 있는 user 정보 가져오기
    const align = getState().image.align;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD kk:mm:ss"),
      align: align,
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
              let post = { user_info, ..._post, id: doc.id, image_url: url }; // addPost 함수(리덕스에 저장)에 넣기 위해 + 리덕스 데이터 형식 맞추기
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

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    // state에서 페이징 정보 가져오기
    let _paging = getState().post.paging;

    // 시작정보가 기록되었는데 다음 가져올 데이터가 없으면 리스트가 끝난다.
    if (_paging.start && !_paging.next) {
      return;
    }

    // 데이터 가져오기 시작!
    dispatch(loading(true));
    const postDB = firestore.collection("myPost");
    // 내림차순으로 정렬하여 시간순으로 가져오기
    let query = postDB.orderBy("insert_dt", "desc");

    // 시작점 정보가 있으면 시작점부터 가져오도록 쿼리 수정
    if (start) {
      query = query.startAt(start);
    }

    // 사이즈보다 1개 더 크게 가져온다.
    // 3개씩 끊어서 보여줄 때, 4개를 가져올 수 있으면 다음 페이지가 있다라고 알 수 있으니까
    // 4개 미만이면 다음 페이지는 없다.
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        // 새로운 페이징 정보를 만들어준다.
        // 시작점에는 새로 가져온 정보의 시작점을 넣고,
        // next에는 마지막 항목을 넣는다
        // 이 next가 다음번 리스트 호출 때 start 파라미터로 넘어온다.
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };
        console.log(paging.next);
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
        });

        // 마지막 하나는 빼준다.
        // size대로 리스트에 추가되기 때문에
        // 마지막 데이터는 다음 페이지의 유무를 알려주기 위한 도구일 뿐, 리스트에 들어가지 않는다.

        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

// 게시글 하나 정보 가져오는 함수 만들기 (상세페이지를 위해)
const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("myPost");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }
        // 키값들만 배열로 만들어서 reduce 돌리기
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
        dispatch(setPost([post]));
      });
  };
};

const deletePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;
    const _user_info = getState().user.user;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx]; // 삭제하려는 게시글 가져오기

    console.log(_post);

    // 1. 이미지 storage 삭제
    // Create a reference to the file to delete
    // var postRef = storage
    //   .ref()
    //   .child(
    //     `images/${_user_info.uid}_${moment().millisecond(_post.insert_dt)}`
    //   )
    //   .delete()
    //   .then(() => {
    //     console.log("storage 삭제 성공!");
    //   })
    //   .catch((err) => {
    //     console.log("이미지 storage 삭제 실패!");
    //   });
    // console.log(postRef);

    // 2. firestore에서 게시글 정보 삭제
    const postDB = firestore.collection("myPost");
    postDB
      .doc(post_id)
      .delete()
      .then(() => {
        console.log("삭제되었어요! : 파이어스토어에서");
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        window.alert("삭제 중 문제가 생겼어요 ;_;");
        console.log("삭제 중 문제가 생겼어요!", err);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        // post_id가 같은 중복 항목을 제거한다.
        draft.list = draft.list.reduce((acc, cur) => {
          // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인하기.
          // 없으면 넣어주기
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            //있으면 덮어쓰기
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        // paging이 있을 때만 넣기
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
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

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post_id);
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        console.log(idx);
        draft.list.splice(idx, 1); // 삭제할 게시글의 index를 찾아서 splice로 지운다.
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

// export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePost,
  deletePostFB,
  getOnePostFB,
};

export { actionCreators };
