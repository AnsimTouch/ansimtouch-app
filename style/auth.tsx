import styled from "styled-components/native";

export const AuthContainer = styled.SafeAreaView`
  background-color: #fbfdff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MainWrapper = styled.View`
  width: 90%;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #2882ff;
  font-weight: 700;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 1%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 12px;

  background-color: #ffffff;
  border-width: 1px;
  border-color: #ededed;
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

export const PhoneInputWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const PhoneButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 10px;
  color: #2882ff;
`;

export const Link = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 1%;
`;

export const LinkText = styled.Text`
  color: #2882ff;
  font-size: 12px;
  text-align: end;
`;

export const ErrorMessage = styled.Text`
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

export const Button = styled.Pressable`
  background-color: #2882ff;
  padding: 20.5px;
  border-radius: 5px;
  align-items: center;

  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  margin: 0 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
