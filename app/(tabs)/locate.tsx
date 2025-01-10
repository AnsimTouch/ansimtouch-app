import * as S from "../../style/locate";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";
import SelectModal from "@/components/Modal/modal";
import { useState } from "react";

export default function Locate() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>();
  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <S.Container>
      <Nav title="위치 확인" router="Home" />
      <Map />
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>이기철 님의 위치</S.LocateText>
            <S.LocateDetail>{locationName}에 위치하고 있습니다.</S.LocateDetail>
          </S.TextWrapper>
          <S.ButtonWrapper>
            <S.Button bgColor="#FF4D4D">
              <S.ButtonText onPress={onPressModalOpen}>
                긴급 알림 하기
              </S.ButtonText>
            </S.Button>
            <S.Button bgColor="#2882FF">
              <S.ButtonText>이전 위치 보기</S.ButtonText>
            </S.Button>
          </S.ButtonWrapper>
        </S.ContentsWrapper>
      </S.LocateWrapper>
      <SelectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={`정말로 알림을${`\n`}실행하시겠습니까?`}
        detail="해당 알림은 취소 할 수 없습니다."
      />
    </S.Container>
  );
}
