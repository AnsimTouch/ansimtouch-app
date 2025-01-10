import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import * as S from "../../style/check";
import AdBox from "@/components/Home/adBox";
import Box from "@/components/box";
import HomeNav from "@/components/Home/honeNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";
import { useGetMe } from "@/hooks/useGetMe";
import axios from "axios";

export default function Check() {
  const [isChecked, setIsChecked] = useState(false); // 체크 상태
  const { user, fetchUser } = useGetMe();

  const handleCheckToggle = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${SERVER_URL}/attendance/mark`,
        {},
        {
          params: { userId: user?.id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        console.log("완료");
        setIsChecked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checked = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.get(`${SERVER_URL}/attendance/status`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userId: user?.id },
      });
      if (res) {
        setIsChecked(res.data.checked);
      }
    } catch (e) {
      console.error("받기 실패", e);
    }
  };

  useEffect(() => {
    checked();
    fetchUser();
  }, []);

  return (
    <S.Container>
      <HomeNav />

      <S.MainWrapper>
        <AdBox />

        <S.CheckBoxContainer>
          <S.CheckBoxWrapper>
            <Image
              source={
                isChecked
                  ? require("../../assets/images/Checked.png")
                  : require("../../assets/images/Unchecked.png")
              }
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <Text
              style={{
                fontSize: 20,
                color: "#333",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {isChecked
                ? "출석체크가 완료되었습니다."
                : "오늘 출석체크를 하지 않았습니다."}
            </Text>
          </S.CheckBoxWrapper>

          {!isChecked && (
            <S.CheckButton onPress={handleCheckToggle}>
              <S.CheckButtonText>눌러서 출석체크</S.CheckButtonText>
            </S.CheckButton>
          )}
        </S.CheckBoxContainer>

        <S.BoxContainer>
          <Box
            iconSource={require("../../assets/images/Chat.png")}
            title="채팅하기"
            content="AI와 채팅합니다."
            navigateTo="Chat"
            backgroundColor="#2882FF"
          />
          <Box
            iconSource={require("../../assets/images/User.png")}
            title="유저 추가"
            content="관리할 사용자를 추가합니다."
            navigateTo="User"
            backgroundColor="#ECF4FF"
          />
        </S.BoxContainer>
      </S.MainWrapper>
    </S.Container>
  );
}
