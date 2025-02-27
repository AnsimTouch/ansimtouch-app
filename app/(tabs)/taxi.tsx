import * as S from "../../style/taxi";
import Nav from "@/components/Nav/nav";
import Map from "@/components/Map/map";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetMe } from "@/hooks/useGetMe";

export default function Taxi() {
  const [locationName, setLocationName] = useState<string>("");
  const { user, fetchUser } = useGetMe();
  const [region, setRegion] = useState({
    latitude: 37.541,
    longitude: 126.986,
  });

  const onTaxiRequest = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${SERVER_URL}/taxi/request`,
        {
          wardUserId: user?.id,
          latitude: region.latitude,
          longitude: region.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("성공", "택시를 호출했습니다.");
      }
    } catch (error) {
      console.error("택시 호출 실패:", error);
      Alert.alert("오류", "택시 호출에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <S.Container>
      <Nav title="택시 호출" router="Home" />
      <Map setLocationName={setLocationName} setRegion={setRegion} />
      <S.LocateWrapper>
        <S.ContentsWrapper>
          <S.TextWrapper>
            <S.LocateText>택시 호출</S.LocateText>
            <S.LocateDetail>{locationName}에 택시를 호출합니다.</S.LocateDetail>
          </S.TextWrapper>
          <S.Button onPress={onTaxiRequest}>
            <S.ButtonText>택시 호출</S.ButtonText>
          </S.Button>
        </S.ContentsWrapper>
      </S.LocateWrapper>
    </S.Container>
  );
}
