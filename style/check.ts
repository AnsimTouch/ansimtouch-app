import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Box = styled.View`
  display: flex;
  justify-content: space-between;
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

export const Nav = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
`;

export const NavTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
`;

export const NavImage = styled(Box)`
  flex-direction: row;
  gap: 10px;
`;

export const MainWrapper = styled(Box)`
  width: 80%;
  align-items: flex-start;
`;

export const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 10px;
`;

export const CheckBoxContainer = styled.View`
  width: 100%;
  margin-top: 11px;
  padding: 25px 63px 40px 63px;
  background-color: #ecf4ff;
  border-radius: 5px;
`;

export const CheckBoxWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const CheckButton = styled(TouchableOpacity)`
  background-color: #2882ff;
  padding: 15px 60px;
  border-radius: 5px;
  align-items: center;
  margin-top: 18px;
`;

export const CheckButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;
