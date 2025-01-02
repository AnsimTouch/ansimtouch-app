import { SafeAreaView, Text, View } from "react-native";
import * as S from "../../style/emergency";
import Nav from "@/components/Nav/nav";

export default function Emergency() {
  return (
    <S.Container>
      <Nav title="유저 관리" router="User" />
      <Text>안ㄴ</Text>
    </S.Container>
  );
}
