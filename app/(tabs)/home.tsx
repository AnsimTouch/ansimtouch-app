import { Image, Text, View } from "react-native";
import * as S from "../../style/home";
import AdBox from "@/components/Home/adBox";
import UserBox from "@/components/Home/userBox";
import { userType } from "@/components/Home/home";
import Box from "@/components/box";
import HomeNav from "@/components/Home/honeNav";
import Check from "./check";
import { useEffect } from "react";
import { useGetMe } from "@/hooks/useGetMe";

const userList: userType[] = [
  { id: "1", name: "이름", state: "7시간 전" },
  { id: "2", name: "이름", state: "7시간 전" },
  { id: "3", name: "이름", state: "현재 접속 중" },
  { id: "4", name: "이름", state: "현재 접속 중" },
];

export default function Home() {
  const { user, fetchUser } = useGetMe();

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>사용자 정보를 불러오는 중에 문제가 발생했습니다.</Text>
      </View>
    );
  }

  // 유저가 "Protector" 타입일 경우
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
              state={userData.state}
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
