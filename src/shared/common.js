export const emailCheck = (email) => {
  // aa_-.123Aaa@aa.com
  // ^[] : 첫번째 글짜가 0~9 a~z A~Z 이다.
  // ([-_.0-9a-zA-z])* : ()이것이 여러번(*)반복될 수 있다.
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  return _reg.test(email);
};
