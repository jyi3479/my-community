import React from "react";
import _ from "lodash";
import Spinner from "../elements/Spinner";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  // throttle 적용
  const _handleScroll = _.throttle(() => {
    // 로딩 중이면 다음 걸 부르면 안된다.
    if (loading) {
      return;
    }
    const { innerHeight } = window; // 가시적으로 보이는 브라우저 창 높이 : 메뉴바 툴바 제외한 크기
    const { scrollHeight } = document.body; // 스크롤할 수 있는 높이

    // 스크롤 계산
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      // 다음 게시글 목록 부르기
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    // 로딩 중이면, return
    if (loading) {
      return;
    }

    // 다음 게시물이 있으면 이벤트를 붙이고, 없으면 이벤트를 삭제한다.
    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    // 컴포넌트가 사라질 때 호출되는 부분 (클린업)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callnext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
