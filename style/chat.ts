import styled from "styled-components/native";

interface chatProps {
  chat: string;
}

export const Box = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fbfdff;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: auto; /* 동적 높이 적용 */
  min-height: 20%;
  background-color: white;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  align-items: center;
`;

export const ChatView = styled.TextInput`
  width: 90%;
  height: 100%;
  padding-left: 10%;
  padding-right: 10%;
  position: absolute;
  align-self: flex-start;
  margin-top: 2%;
`;

export const SendImage = styled.TouchableOpacity<chatProps>`
  margin-top: 2%;
  position: absolute;
  right: 5%;
  display: ${(props) => (props.chat ? "block" : "none")};
`;
