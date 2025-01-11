import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as S from "../../style/home";
import AdBox from "@/components/Home/adBox";
import UserBox from "@/components/Home/userBox";
import Box from "@/components/box";
import HomeNav from "@/components/Home/honeNav";
import Check from "./check";
import { useGetMe } from "@/hooks/useGetMe";
import axios from "axios";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [userList, setUserList] = useState<any[]>([]);
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
        return {
          name: res.data.username,
          number: res.data.tel,
          last: res.data.lastUpdatedAt,
        };
      }
    } catch (e) {
      console.error("유저 정보 가져오기 실패", e);
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

      if (res) {
        const protecteesData = res.data.protectees || [];
        const protectorsData = res.data.protectors || [];
        const allRelations = [...protecteesData, ...protectorsData];
        const updatedUserList = await Promise.all(
          allRelations.map(async (relation: any) => {
            const userData = await fetchUserInfo(relation.id);
            return {
              id: relation.id,
              name: userData?.name || "Unknown",
              number: userData?.number || "N/A",
              state: userData?.last || null,
            };
          })
        );

        setUserList(updatedUserList);
      } else {
        console.error("응답 데이터가 없습니다.");
      }
    } catch (e) {
      console.error("관계 정보 가져오기 실패", e);
    }
  };

  const formatRelativeTime = (lastUpdatedAt: string | null): string => {
    if (!lastUpdatedAt) return "알 수 없음";

    const now = new Date();
    const lastDate = new Date(lastUpdatedAt);
    const diffInMinutes = Math.floor(
      (now.getTime() - lastDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  useEffect(() => {
    fetchUser();
    if (user) {
      onRelationship();
    }
  }, [user]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>사용자 정보를 불러오는 중에 문제가 발생했습니다.</Text>
      </View>
    );
  }

  return user?.userType === "Protector" ? (
    <S.Container>
      <HomeNav />

      <S.MainWrapper>
        <AdBox />
        <S.UserWrapper horizontal={true} showsHorizontalScrollIndicator={false}>
          {userList.map((userData) => (
            <UserBox
              key={userData.id}
              name={userData.name}
              state={formatRelativeTime(userData.state)}
            />
          ))}
        </S.UserWrapper>

        <S.BoxContainer>
          {/* 택시호출 */}
          <Box
            iconSource={require("../../assets/images/Taxi.png")}
            title="택시 호출"
            content="사용자의 집으로 택시를 요청합니다."
            navigateTo="Taxi"
            backgroundColor="#FFD012"
          />
          {/* 긴급알림 */}
          <Box
            iconSource={require("../../assets/images/EmergencyAlarm.png")}
            title="긴급 알림"
            content="5분 이내로 응답이 없을시 보호자에게 알림을 전송합니다."
            navigateTo="Emergency"
            backgroundColor="#FF3232"
          />
          {/* 유저추가 */}
          <Box
            iconSource={require("../../assets/images/User.png")}
            title="유저 추가"
            content="관리할 사용자를 추가합니다."
            navigateTo="User"
            backgroundColor="#ECF4FF"
          />
          {/* 위치확인 */}
          <Box
            iconSource={require("../../assets/images/Location.png")}
            title="위치 확인"
            content="사용자의 위치를 확인합니다."
            navigateTo="Locate"
            backgroundColor="#DEFFD6"
          />
        </S.BoxContainer>
      </S.MainWrapper>
    </S.Container>
  ) : (
    <Check />
  );
}
