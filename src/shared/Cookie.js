// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
  // 쿠키 값 가져오기
  let value = "; " + document.cookie;
  // 키 값을 기준으로 파싱
  // aa=xx; user_id=aaa; abbb=sssss; 여기서 user_id의 키값(aaa)을 알고 싶다
  // [aa=xx, aaa; abbb=sssss;]
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

// 쿠키에 저장하는 함수 (exp를 5로 기본값을 지정해줌)

const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

// 만료일을 예전으로 설정해 쿠키를 지워주는 함수
const deleteCookie = (name) => {
  // 예전 날짜 아무거나 지정해줌
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);

  document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
