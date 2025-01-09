import React, { useState } from "react";
import { Image, Text } from "react-native";
import * as S from "../../style/check";
import AdBox from "@/components/Home/adBox";
import Box from "@/components/box";

export default function Check() {
  const [isChecked, setIsChecked] = useState(false); // 체크 상태

  const handleCheckToggle = () => {
    setIsChecked(!isChecked);
  };

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
        </S.BoxContainer>
      </S.MainWrapper>
    </S.Container>
  );
}
