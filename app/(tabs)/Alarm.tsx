import Notification from "@/components/Alarm/Notification";
import styled from "styled-components/native";

export default function Alarm() {
  return (
    <Container>
      <Notification type="TAXI_CALL" />

      <Notification
        type="RELATION_REQUEST"
        user="김철수"
        phoneNumber="010-1234-5678"
        onApprove={() => console.log("승인하기")}
        onReject={() => console.log("거절하기")}
      />

      <Notification type="RELATION_ACCEPTED" user="박영희" />

      <Notification type="ATTENDANCE_MISSING" user="이민수" />

      <Notification type="ATTENDANCE_COMPLETE" user="한지수" />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fbfdff;
`;
