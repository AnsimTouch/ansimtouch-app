import { Image, Text, View } from "react-native";
import * as S from "../../style/home";

export default function Home() {
  return (
    <S.Container>
      <S.Nav>
        <S.NavTitle>안심터치</S.NavTitle>
        <S.NavImage>
          <Image source={require("../../assets/images/Bell.png")} />
          <Image source={require("../../assets/images/Setting.png")} />
        </S.NavImage>
      </S.Nav>
    </S.Container>
  );
}
