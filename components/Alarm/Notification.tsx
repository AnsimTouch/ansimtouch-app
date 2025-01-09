import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

type NotificationType =
  | "TAXI_CALL"
  | "RELATION_REQUEST"
  | "RELATION_ACCEPTED"
  | "ATTENDANCE_MISSING"
  | "ATTENDANCE_COMPLETE";

interface NotificationProps {
  type: NotificationType;
  user?: string;
  phoneNumber?: string;
  onApprove?: () => void;
  onReject?: () => void;
}
const Notification: React.FC<NotificationProps> = ({
  type,
  user,
  phoneNumber,
  onApprove,
  onReject,
}) => {
  const getNotificationConfig = () => {
    switch (type) {
      case "TAXI_CALL":
        return {
          backgroundColor: "#FFD012",
          icon: require("../../assets/images/TaxiIcon.png"),
          textColor: "#141414",
          text: `택시 호출에 성공했습니다.`,
        };
      case "RELATION_REQUEST":
        return {
          backgroundColor: "#ECF4FF",
          textColor: "#141414",
          text: `${user || "알 수 없는 사용자"} 님이 관계를 요청했습니다.`,
          showButtons: true,
        };
      case "RELATION_ACCEPTED":
        return {
          backgroundColor: "#ECF4FF",
          icon: require("../../assets/images/UserIcon.png"),
          textColor: "#141414",
          text: `${user || "알 수 없는 사용자"} 님이 관계 요청을 수락했습니다.`,
        };
      case "ATTENDANCE_MISSING":
        return {
          backgroundColor: "#FF3232",
          icon: require("../../assets/images/Unchecked.png"),
          textColor: "#FFFFFF",
          text: `${
            user || "알 수 없는 사용자"
          } 님이 어제 출석체크를 하지 않았습니다.`,
        };
      case "ATTENDANCE_COMPLETE":
        return {
          backgroundColor: "#2882FF",
          icon: require("../../assets/images/Checked.png"),
          textColor: "#FFFFFF",
          text: `${
            user || "알 수 없는 사용자"
          } 님이 7시간 전 출석체크를 했습니다.`,
        };
      default:
        return {};
    }
  };

  const { backgroundColor, icon, text, textColor, showButtons } =
    getNotificationConfig();

  return (
    <NotificationContainer style={{ backgroundColor }}>
      <ContentContainer>
        <NotificationText style={{ color: textColor }}>{text}</NotificationText>
        {phoneNumber && <PhoneNumberText>{phoneNumber}</PhoneNumberText>}
      </ContentContainer>

      {icon && <NotificationIcon source={icon} />}

      {showButtons && (
        <ButtonContainer>
          <ApproveButton onPress={onApprove}>
            <ApproveButtonText>승인하기</ApproveButtonText>
          </ApproveButton>
          <RejectButton onPress={onReject}>
            <RejectButtonText>거절하기</RejectButtonText>
          </RejectButton>
        </ButtonContainer>
      )}
    </NotificationContainer>
  );
};

const NotificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;
  margin-bottom: 5px;
  width: 100%;
  height: 84px;
`;

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const NotificationIcon = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const NotificationText = styled.Text`
  flex: 1;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ApproveButton = styled(TouchableOpacity)`
  background-color: #2882ff;
  padding: 5px 6px;
  border-radius: 5px;
`;

const ApproveButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

const RejectButton = styled(TouchableOpacity)`
  background-color: white;
  padding: 5px 6px;
  border-radius: 5px;
`;

const RejectButtonText = styled.Text`
  color: #ff3232;
  font-size: 12px;
`;

const PhoneNumberText = styled.Text`
  font-size: 14px;
  color: #4c4c4c;
  margin-top: 5px;
`;

export default Notification;
