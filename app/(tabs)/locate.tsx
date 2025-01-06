import * as S from "../../style/locate";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";
import { View } from "react-native";

export default function Locate() {
  return (
    <S.Container>
      <Nav title="위치 확인" router="Home" />
      <Map />
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>이기철 님의 위치</S.LocateText>
            <S.LocateDetail>SK남산그린빌딩에 위치하고 있습니다.</S.LocateDetail>
          </S.TextWrapper>
          <S.ButtonWrapper>
            <S.Button bgColor="#FF4D4D">
              <S.ButtonText>긴급 알림 하기</S.ButtonText>
            </S.Button>
            <S.Button bgColor="#2882FF">
              <S.ButtonText>이전 위치 보기</S.ButtonText>
            </S.Button>
          </S.ButtonWrapper>
        </S.ContentsWrapper>
      </S.LocateWrapper>
    </S.Container>
  );
}
