import styled from "styled-components";
import { Avatar, BottomButtons, FlexBox } from "../components";

const Notifications = () => {
  const notifications = [
    {
      profile:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      message: "Shubham followed you.",
    },
    {
      profile:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      message: "Shubham followed you",
    },
    {
      profile:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      message: "Shubham followed you",
    },
    {
      profile:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      message: "Shubham followed you",
    },
    {
      profile:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      message: "Shubham followed you",
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "left" }}>Notifications</h2>
      {notifications.map((notification, i) => (
        <NotificationWrapper key={i}>
          <NotificationDivider />
          <FlexBox
            key={i}
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar src={notification.profile} size="2.8rem" />
            <p style={{ marginLeft: "0.5rem" }}>{notification.message}</p>
          </FlexBox>
        </NotificationWrapper>
      ))}
      <NotificationDivider style={{ width: "90%", margin: "auto" }} />
      <BottomButtons />
    </div>
  );
};

const NotificationWrapper = styled.div`
  margin: 0.5rem 1rem;
`;

const NotificationDivider = styled.div`
  width: 100%;
  height: 0.1rem;
  margin-bottom: 0.3rem;
  background: #f0f0f0;
`;

export default Notifications;
