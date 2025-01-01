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
`;

export const MainWrapper = styled(Box)`
  width: 80%;
  height: 100%;
`;

export const MenuTable = styled(Box)`
  width: 100%;
  height: 30px;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 24px;
`;

export const UserButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2882ff;
  width: 20%;
  height: 100%;
  border-radius: 5px;
`;
