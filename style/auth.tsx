import styled from "styled-components/native";

export const AuthContainer = styled.SafeAreaView`
  background-color: #fbfdff;
  flex: 1;
  margin: 0;
  padding: 1rem;
  position: relative;
`;

export const MainWrapper = styled.View``;

export const Title = styled.Text`
  font-size: 1.75rem;
  color: #2882ff;
`;

export const SubTitle = styled.Text`
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 3.125rem;
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
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
`;
