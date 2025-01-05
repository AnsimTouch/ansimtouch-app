import { Image } from "react-native";
import * as S from "../../style/home";
import AdBox from "@/components/Home/adBox";
import UserBox from "@/components/Home/userBox";
import { userType } from "@/components/Home/main";

const userList: userType[] = [
  { id: "1", name: "이름", state: "7시간 전" },
  { id: "2", name: "이름", state: "현재 접속 중" },
];

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
      </S.MainWrapper>
    </S.Container>
  );
}
