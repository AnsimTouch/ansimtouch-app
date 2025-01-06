import { Image } from "react-native";
import * as S from "../../style/check";
import AdBox from "@/components/Home/adBox";
import Box from "@/components/Home/box";

export default function Check() {
  return (
    <S.Container>
      <S.Nav>
        <S.NavTitle>안심터치</S.NavTitle>
        <S.NavImage>
          <Image source={require("../../assets/images/Bell.png")} />
          <Image source={require("../../assets/images/Setting.png")} />
        </S.NavImage>
      </S.Nav>

      <S.MainWrapper>
        <AdBox />

        <S.BoxContainer>
          <Box
            iconSource={require("../../assets/images/Chat.png")}
            title="채팅하기"
            content="AI와 채팅합니다."
            navigateTo="Chat"
            backgroundColor="#2882FF"
          />
        </S.BoxContainer>
      </S.MainWrapper>
    </S.Container>
  );
}
