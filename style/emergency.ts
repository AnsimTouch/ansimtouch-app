import styled from "styled-components/native";

interface colorProps {
  color: string;
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

export const MainWrapper = styled(Box)`
  margin-top: -60px;
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled(Box)`
  flex-direction: column;
  width: 100%;
  height: 353px;
  background-color: white;
  border-radius: 5px;
  gap: 18px;
`;

export const Button = styled.TouchableOpacity`
  width: 60%;
  background-color: #ff3232;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
`;

export const ModalView = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: "black";
`;

export const ModalContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.3);
`;

export const ModalWrapper = styled(Box)`
  width: 80%;
  height: 183px;
  background-color: white;
  border-radius: 20px;
  justify-content: space-evenly;
`;

export const ModalButton = styled.TouchableOpacity<colorProps>`
  width: 48%;
  height: 54px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
