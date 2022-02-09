import React from "react";
import Card from "../components/Card";
import { Grid } from "../elements";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const Notification = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);
  // 페이지 열리자마자 보여줘야 하니까, userEffect
  React.useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    const _noti = notiDB.orderByChild("insert_dt");
    // 처음에만 가져오는 것이기 때문에 구독하지 않아서 once 씀
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        console.log(_noti_list);
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n, index) => {
          return <Card {...n} key={index} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
