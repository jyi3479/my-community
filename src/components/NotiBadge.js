import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid); // 현재 접속자 id
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    //realtime database 리스너 구독하기 (realtime database에서 실시간으로 데이터 가져오는 이벤트? 구독한 것임.)
    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val());

      setIsRead(snapshot.val().read);
    });
    // 구독 해제
    return () => notiDB.off();
  }, []);

  return (
    <React.Fragment>
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
