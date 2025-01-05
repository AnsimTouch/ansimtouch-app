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

export default function ForgotPassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호 입력
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [isVerificationStarted, setIsVerificationStarted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const apiKey = "skjdklas"; // 임시 API 키

  // 인증 코드 요청 함수
  const onRequestVerification = async () => {
    if (!phoneNumber) {
      setErrorMessage("전화번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `https://${apiKey}/request-verification`,
        {
          phoneNumber,
        }
      );

      if (response.status === 200) {
        setIsVerificationStarted(true);
        setModalMessage("인증 코드가 SMS로 전송되었습니다.");
        setIsModalVisible(true);
      }
    } catch (error) {
      setErrorMessage("인증 코드 요청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const onFindPassword = async () => {
    if (!verificationCode) {
      setErrorMessage("인증 코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`https://${apiKey}/find-password`, {
        phoneNumber,
        verificationCode,
      });

      if (response.status === 200) {
        setModalMessage(
          "비밀번호가 성공적으로 찾았습니다. 로그인 페이지로 이동합니다."
        );
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.AuthContainer>
      <Nav title="비밀번호 찾기" router="ForgotPassword" />

      <S.MainWrapper>
        <S.Title>비밀번호 찾기</S.Title>
        <S.SubTitle>비밀번호를 찾습니다.</S.SubTitle>

        {!isVerificationStarted && (
          <S.Input
            placeholder="전화번호를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        )}

        {isVerificationStarted && (
          <>
            <S.Input
              placeholder="인증 코드를 입력해주세요."
              placeholderTextColor="#4C4C4C"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
          </>
        )}
      </S.MainWrapper>

      {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

      {!isVerificationStarted ? (
        <S.Button onPress={onRequestVerification} disabled={isLoading}>
          <S.ButtonText>
            {isLoading ? "인증 코드 요청 중..." : "인증 코드 요청"}
          </S.ButtonText>
        </S.Button>
      ) : (
        <S.Button onPress={onFindPassword} disabled={isLoading}>
          <S.ButtonText>
            {isLoading ? "비밀번호 찾는 중..." : "비밀번호 찾기"}
          </S.ButtonText>
        </S.Button>
      )}

      <SelectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="알림"
        detail={modalMessage}
      />
    </S.AuthContainer>
  );
}
