import { Text, TouchableOpacity, View, Image } from "react-native";
import * as S from "../../style/user";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
type RootStackParamList = {
  AddUser: undefined;
};

export default function User() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <Nav title="유저 관리" router="User" />
      <S.MainWrapper>
        <S.MenuTable>
          <S.Title>관리 유저</S.Title>
          <S.UserButton onPress={() => navigation.navigate("AddUser")}>
            <Text style={{ color: "white" }}>추가하기</Text>
          </S.UserButton>
        </S.MenuTable>
      </S.MainWrapper>
    </S.Container>
  );
}
