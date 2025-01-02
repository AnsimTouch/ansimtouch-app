import { useState } from "react";
import * as S from "../../style/user";
import Nav from "@/components/Nav/nav";
import { Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import UserBox from "@/components/UserBox/userBox";
import { UserType } from "@/components/UserBox/userType";

export default function AddUser() {
  const userList: UserType[] = [
    { id: "1", name: "이름", number: "010-1234-5678" },
    { id: "2", name: "이름", number: "010-1234-5678" },
    { id: "3", name: "이름", number: "010-1234-5678" },
    { id: "4", name: "이름", number: "010-1234-5678" },
    { id: "5", name: "이름", number: "010-1234-5678" },
    { id: "6", name: "이름", number: "010-1234-5678" },
    { id: "7", name: "이름", number: "010-1234-5678" },
  ];

  const [number, setNumber] = useState<string>();
  const regex = /^[0-9-]*$/;
  const isNumber = (value: string) => {
    if (regex.test(value)) {
      setNumber(value);
    }
  };
  return (
    <S.Container>
      <Nav title="유저 추가하기" router="User" />
      <S.MainWrapper>
        <S.SearchView>
          <S.Search
            placeholder="전화번호를 입력해주세요."
            value={number}
            onChangeText={isNumber}
            maxLength={13}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: "10%", top: "20%" }}
          >
            <Image source={require("../../assets/images/Search.png")} />
          </TouchableOpacity>
        </S.SearchView>
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
