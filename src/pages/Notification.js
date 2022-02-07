import React from "react";
import Card from "../components/Card";
import { Grid } from "../elements";

const Notification = (props) => {
  const noti = [
    {
      user_name: "aaaaa",
      post_id: "post1",
    },
    {
      user_name: "aaaaa",
      post_id: "post2",
    },
    {
      user_name: "aaaaa",
      post_id: "post3",
    },
    {
      user_name: "aaaaa",
      post_id: "post4",
    },
    {
      user_name: "aaaaa",
      post_id: "post5",
    },
  ];
  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n) => {
          return <Card {...n} key={n.post_id} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
