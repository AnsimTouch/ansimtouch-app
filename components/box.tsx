import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type BoxProps = {
  iconSource: ImageSourcePropType;
  title: string;
  content: string;
  navigateTo: string;
  backgroundColor?: string;
};

type RootStackParamList = {
  [key: string]: undefined;
};

const Box: React.FC<BoxProps> = ({
  iconSource,
  title,
  content,
  navigateTo,
  backgroundColor = "#FBFDFF",
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // 네비게이션 사용

  const handlePress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <Container backgroundColor={backgroundColor} onPress={handlePress}>
      <Icon source={iconSource} />
      <TextWrapper>
        <Title isAlert={title === "긴급 알림" || title === "채팅하기"}>
          {title}
        </Title>
        <Content
          isAlert={
            content ===
              "5분 이내로 응답이 없을시 보호자에게 알림을 전송합니다." ||
            content === "AI와 채팅합니다."
          }
        >
          {content}
        </Content>
      </TextWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 35px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  overflow: hidden;
`;

const Icon = styled.Image`
  position: absolute;
  border-radius: 25px;
  margin-right: 16px;
  left: -1.5rem;
`;

const TextWrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text<{ isAlert: boolean }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ isAlert }) => (isAlert ? "#FFFFFF" : "#141414")};
`;

const Content = styled.Text<{ isAlert: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: #4c4c4c;
  color: ${({ isAlert }) => (isAlert ? "#FFFFFF" : "#141414")};
`;

export default Box;
