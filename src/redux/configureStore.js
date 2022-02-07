// #1. import 하기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";

// ## 스토어에 히스토리 넣어주기 (히스토리 만들어줌) : 이제 스토리에 히스토리도 넣어줄 수 있음.
export const history = createBrowserHistory();

// #2. rootreducer 만들기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  router: connectRouter(history), // 우리가 만든 히스토리랑 router가 연결이 되는 것임.
});

// #3. 미들웨어 준비
// const middlewares = [thunk]
// 이제 미들웨어 단계에서 히스토리 쓸 수 있음. 데이터 받아온 뒤, 히스토리 받아서 그 곳으로 가기 가능
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  // 개발환경일때만 볼거니까, 굳이 import할 필요가 없음.
  const { logger } = require("redux-logger"); // require : 패키지 가져올 때
  middlewares.push(logger);
}

// #4. redux devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// #5. 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// #6. 스토어 만들기 : 미들웨어와 루트 리듀서 엮기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
