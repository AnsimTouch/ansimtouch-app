import * as S from "../../style/taxi";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";
import { useState } from "react";

export default function Taxi() {
  const [locationName, setLocationName] = useState<string>(); // 위치 이름 만들기
  return (
    <S.Container>
      <Nav title="택시 호출" router="Home" />
      <Map setLocationName={setLocationName} />
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>택시 호출</S.LocateText>
            <S.LocateDetail>{locationName}에 택시를 호출합니다.</S.LocateDetail>
          </S.TextWrapper>
          <S.Button>
            <S.ButtonText>택시 호출</S.ButtonText>
          </S.Button>
        </S.ContentsWrapper>
      </S.LocateWrapper>
    </S.Container>
  );
}
