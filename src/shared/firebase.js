import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYryLiLachvY3zEfkyfspip0hYw58lDsU",
  authDomain: "my-image-community.firebaseapp.com",
  projectId: "my-image-community",
  storageBucket: "my-image-community.appspot.com",
  messagingSenderId: "448571041499",
  appId: "1:448571041499:web:db0fe54c6f4db637368efe",
  measurementId: "G-RXFPXGPNYS",
};

// firebase 초기화
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
// 인증 만들기
const auth = firebase.auth();
// firestore 연동
const firestore = firebase.firestore();
// storage 연동
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
