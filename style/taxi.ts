import styled from "styled-components/native";

export const Box = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: none;
`;

export const LocateWrapper = styled(Box)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 25%;
  background-color: #fbfdff;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-color: #e2e4e5;
`;

export const ContentsWrapper = styled(Box)`
  width: 80%;
  gap: 30px;
`;

export const TextWrapper = styled.View`
  width: 100%;
  align-items: flex-start;
`;

export const LocateText = styled.Text`
  font-size: 22px;
  color: #2882ff;
  font-weight: 700;
`;

export const LocateDetail = styled.Text`
  font-size: 18px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 4%;
  background-color: #2882ff;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;
