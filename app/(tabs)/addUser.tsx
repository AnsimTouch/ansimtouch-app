import { useState } from "react";
import * as S from "../../style/user";
import Nav from "@/components/Nav/nav";
import { SERVER_URL } from "@env";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AddUser() {
  const [number, setNumber] = useState<string>("");

  const isNumber = (value: string) => {
    setNumber(value);
  };
  const onAddNum = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${SERVER_URL}/user/ward`,
        {},
        {
          params: { wardTel: number },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        console.log("보내기 성공");
        Alert.alert("보냈습니다");
      }
    } catch (e) {
      console.error(e);
      console.log(number);
      Alert.alert("전송에 실패했습니다.");
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
            style={{ position: "absolute", right: "10%", top: "40%" }}
            onPress={onAddNum}
          >
            <Text style={styles.add}>추가하기</Text>
          </TouchableOpacity>
        </S.SearchView>
      </S.MainWrapper>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  add: {
    color: "#2882FF",
    fontSize: 20,
  },
});
