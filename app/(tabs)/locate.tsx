import * as S from "../../style/locate";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";
import SelectModal from "@/components/Modal/modal";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useGetMe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";
import axios from "axios";
import { Region } from "react-native-maps";

export default function Locate() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("알 수 없음");
  const [userLocation, setUserLocation] = useState<Region | null>(null); // 지도 중심
  const { user, fetchUser } = useGetMe();

  const fetchUserInfo = async (userId: string) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${SERVER_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res) {
        const { username, tel, lastLocationLa, lastLocationLo, lastUpdatedAt } =
          res.data;

        // 위치 정보 설정
        if (lastLocationLa && lastLocationLo) {
          setUserLocation({
            latitude: lastLocationLa,
            longitude: lastLocationLo,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
        // 위치 이름 초기화
        setLocationName(`${username}의 위치를 불러오는 중...`);
        return {
          name: username,
          number: tel,
          last: lastUpdatedAt,
        };
      }
    } catch (e) {
      console.error("유저 정보 가져오기 실패", e);
      setLocationName("알 수 없는 위치");
      return {
        name: "알 수 없는 이름",
        number: "알 수 없는 전화번호",
        last: null,
      };
    }
  };

  const onRelationship = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.get(`${SERVER_URL}/user/relationship`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userId: user?.id },
      });

      if (res && res.data.protectees?.length > 0) {
        // 첫 번째 관리 대상의 정보 가져오기
        await fetchUserInfo(res.data.protectees[0].id);
      } else {
        console.error("관리 대상 유저 데이터가 없습니다.");
      }
    } catch (e) {
      console.error("유저 정보 가져오기 실패", e);
    }
  };

  useEffect(() => {
    fetchUser();
    if (user) {
      onRelationship();
    }
  }, [user]);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <S.Container>
      <Nav title="위치 확인" router="Home" />
      {userLocation && (
        <Map
          setLocationName={setLocationName}
          setRegion={setUserLocation}
          initialRegion={userLocation}
        />
      )}
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>관리 대상의 현재 위치</S.LocateText>
            <S.LocateDetail>{locationName}</S.LocateDetail>
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
