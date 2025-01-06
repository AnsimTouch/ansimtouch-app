import * as S from "../../style/taxi";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";

export default function Taxi() {
  return (
    <S.Container>
      <Nav title="택시 호출" router="Home" />
      <Map />
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>이기철 님의 위치</S.LocateText>
            <S.LocateDetail>SK남산그린빌딩에 위치하고 있습니다.</S.LocateDetail>
          </S.TextWrapper>
          <S.Button bgColor="#2882FF">
            <S.ButtonText>택시 호출</S.ButtonText>
          </S.Button>
        </S.ContentsWrapper>
      </S.LocateWrapper>
    </S.Container>
  );
}
