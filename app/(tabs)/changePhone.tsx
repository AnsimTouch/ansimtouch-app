import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import SelectModal from "@/components/Modal/auth";
import * as S from "../../style/auth";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function ChangePhone() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationStarted, setIsVerificationStarted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const apiKey = "skjdklas"; // 임시 API 키

  const onRequestVerification = async () => {
    if (!phoneNumber) {
      setErrorMessage("전화번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`http://${apiKey}/verify/send`, {
        phoneNumber,
      });

      if (response.status === 200) {
        setIsVerificationStarted(true);
        setModalMessage("인증 코드가 발송되었습니다.");
        setIsModalVisible(true);
      }
    } catch (error) {
      setErrorMessage("인증 코드 발송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePhone = async () => {
    if (!phoneNumber || !verificationCode) {
      setErrorMessage("전화번호와 인증코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`https://${apiKey}/change-phone`, {
        phoneNumber,
        verificationCode,
      });

      if (response.status === 200) {
        setModalMessage("전화번호가 성공적으로 변경되었습니다.");
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("전화번호 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.AuthContainer>
      <Nav title="전화번호 수정" router="ChangePhone" />

      <S.MainWrapper>
        <S.Title>전화번호 수정</S.Title>
        <S.SubTitle>전화번호를 수정합니다.</S.SubTitle>

        <S.PhoneInputWrapper>
          <S.Input
            placeholder="전화번호를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
          <S.PhoneButton onPress={onRequestVerification}>
            인증하기
          </S.PhoneButton>
        </S.PhoneInputWrapper>

        {isVerificationStarted && (
          <S.Input
            placeholder="인증코드를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        )}
      </S.MainWrapper>

      {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

      <S.Button onPress={onChangePhone} disabled={isLoading}>
        <S.ButtonText>
          {isLoading ? "수정 중..." : "전화번호 수정"}
        </S.ButtonText>
      </S.Button>

      <SelectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="알림"
        detail={modalMessage}
      />
    </S.AuthContainer>
  );
}
