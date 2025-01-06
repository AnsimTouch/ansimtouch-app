import { Image } from "react-native";
import * as S from "../../style/home";
import AdBox from "@/components/Home/adBox";
import UserBox from "@/components/Home/userBox";
import { userType } from "@/components/Home/home";
import Box from "@/components/Home/box";

const userList: userType[] = [
  { id: "1", name: "이름", state: "7시간 전" },
  { id: "2", name: "이름", state: "7시간 전" },
  { id: "3", name: "이름", state: "현재 접속 중" },
  { id: "4", name: "이름", state: "현재 접속 중" },
];

// 한번에 두 개 딱 맞게 하는 건 도저히 못하겠음 나중에 시간 남으면 ㄱㄱ
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

      <S.MainWrapper>
        <AdBox />
        <S.UserWrapper horizontal={true} showsHorizontalScrollIndicator={false}>
          {userList.map((id) => (
            <UserBox key={id.id} name={id.name} state={id.state} />
          ))}
        </S.UserWrapper>

        <S.BoxContainer>
          {/* 택시호출 */}
          <Box
            iconSource={require("../../assets/images/Taxi.png")}
            title="택시 호출"
            content="사용자의 집으로로 택시를 요청합니다."
            navigateTo="Taxi"
            backgroundColor="#FFD012"
          />
          {/* 긴급알림 */}
          <Box
            iconSource={require("../../assets/images/EmergencyAlarm.png")}
            title="긴급 알림"
            content="5분 이내로 응답이 없을시 보호자에게 알림을 전송합니다."
            navigateTo="Taxi"
            backgroundColor="#FF3232"
          />
          {/* 유저추가 */}
          <Box
            iconSource={require("../../assets/images/User.png")}
            title="유저 추가"
            content="관리할 사용자를 추가합니다."
            navigateTo="Taxi"
            backgroundColor="#ECF4FF"
          />
          {/* 위치확인 */}
          <Box
            iconSource={require("../../assets/images/Location.png")}
            title="위치 확인"
            content="사용자의 위치를 확인합니다."
            navigateTo="Taxi"
            backgroundColor="#DEFFD6"
          />
        </S.BoxContainer>
      </S.MainWrapper>
    </S.Container>
  );
}
