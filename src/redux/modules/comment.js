import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

import firebase from "firebase/app";

import { actionCreators as postActions } from "./post";

// action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

//action creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialState
const initialState = {
  list: {},
  is_loading: false,
};

// 댓글 추가하기
const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD kk:mm:ss"),
    };

    commentDB.add(comment).then((doc) => {
      // 댓글 개수 1개 증가시키는 작업
      const postDB = firestore.collection("myPost"); //firestore 데이터 불러오기
      const post = getState().post.list.find((l) => l.id === post_id); // 리덕스 데이터 불러오기

      // firestore에 저장된 값을 현재값에서 +1 해준다.
      const increment = firebase.firestore.FieldValue.increment(1);
      comment = { ...comment, id: doc.id };
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment }) // let a = 5; a= a+ 1  a=comment_cnt 기능
        .then((_post) => {
          dispatch(addComment(post_id, comment));

          if (post) {
            // 리덕스만 고치는거니까 FB함수 아님
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              })
            );
          }
        });
    });
  };
};

// 댓글 가져오기
const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    // post_id가 없으면 바로 리턴
    if (!post_id) {
      return;
    }
    const commentDB = firestore.collection("comment");
    // where() 메서드 : firestore 쿼리 연산자
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        console.log(list);
        // 가져온 데이터 넣어주기
        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글 가져오기 실패!", post_id, err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // comment는 딕셔너리 구조로 만들었다.
        // post_id로 나눠서 보관하자! (각각 게시글 방에 댓글을 넣어주자.)
        draft.list[action.payload.post_id] = action.payload.comment_list;
        console.log(action.payload.comment_list);
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },

  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
