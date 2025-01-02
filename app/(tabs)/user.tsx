import { Text, FlatList, StyleSheet } from "react-native";
import * as S from "../../style/user";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import UserBox from "@/components/UserBox/userBox";
import { UserType } from "@/components/UserBox/userType";

type RootStackParamList = {
  AddUser: undefined;
};

const userList: UserType[] = [
  { id: "1", name: "이름", number: "010-1234-5678" },
  { id: "2", name: "이름", number: "010-1234-5678" },
  { id: "3", name: "이름", number: "010-1234-5678" },
  { id: "4", name: "이름", number: "010-1234-5678" },
  { id: "5", name: "이름", number: "010-1234-5678" },
  { id: "6", name: "이름", number: "010-1234-5678" },
  { id: "7", name: "이름", number: "010-1234-5678" },
];

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
        <FlatList<UserType>
          style={styles.FlatList}
          data={userList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserBox name={item.name} number={item.number} />
          )}
        />
      </S.MainWrapper>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  FlatList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
});
