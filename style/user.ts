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

export const MainWrapper = styled(Box)`
  width: 80%;
  height: 100%;
  justify-content: none;
`;

export const MenuTable = styled(Box)`
  width: 100%;
  height: 30px;
  flex-direction: row;
  margin-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: 24px;
`;

export const UserButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2882ff;
  width: 30%;
  height: 100%;
  border-radius: 5px;
`;

export const SearchView = styled.View`
  width: 100%;
  height: 5%;
  margin-bottom: 19px;
`;

export const Search = styled.TextInput`
  border: 1px solid #ededed;
  border-radius: 5px;
  padding-left: 20px;
  width: 100%;
  height: 100%;
`;

export const ListWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ModalView = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: "black";
`;
