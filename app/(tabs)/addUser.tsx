import { useState } from "react";
import * as S from "../../style/user";
import Nav from "@/components/Nav/nav";
import { Image, TouchableOpacity } from "react-native";

export default function AddUser() {
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
      </S.MainWrapper>
    </S.Container>
  );
}
