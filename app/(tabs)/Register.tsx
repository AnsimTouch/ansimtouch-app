import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import SelectModal from "@/components/Modal/auth";
import * as S from "../../style/auth";
import styled from "styled-components/native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationStarted, setIsVerificationStarted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const apiKey = "skjdklas"; // 임시 API 키

  const onRegister = async () => {
    if (
      !name ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !verificationCode
    ) {
      setErrorMessage("모든 필드를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`https://${apiKey}/register`, {
        name,
        password,
        phoneNumber,
        verificationCode,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setModalMessage("회원가입 성공!");
        setIsModalVisible(true);
        setTimeout(() => navigation.navigate("Login"), 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setModalMessage("회원가입 실패! 다시 시도해주세요.");
      setIsModalVisible(true);
    }
  };

  const onRequestVerification = () => {
    if (!phoneNumber) {
      setErrorMessage("전화번호를 입력해주세요.");
      return;
    }

    setErrorMessage("");
    setIsVerificationStarted(true);

    axios
      .post(`https://${apiKey}/send-verification-code`, { phoneNumber })
      .then(() => {
        setModalMessage("인증 코드가 발송되었습니다.");
        setIsModalVisible(true);
      })
      .catch(() => {
        setModalMessage("인증 코드 발송에 실패했습니다. 다시 시도해주세요.");
        setIsModalVisible(true);
      });
  };

  return (
    <S.AuthContainer>
      <Nav title="회원가입" router="Register" />

      <S.MainWrapper>
        <S.Title>회원가입</S.Title>
        <S.SubTitle>회원가입 후 진행해주세요.</S.SubTitle>

        <S.Input
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#4C4C4C"
          value={name}
          onChangeText={setName}
        />
        <S.Input
          placeholder="비밀번호를 입력해주세요."
          placeholderTextColor="#4C4C4C"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <S.Input
          placeholder="비밀번호를 재입력해주세요."
          placeholderTextColor="#4C4C4C"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <PhoneInputWrapper>
          <S.Input
            placeholder="전화번호를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            style={{ flex: 1 }}
          ></S.Input>
          <PhoneButton onPress={onRequestVerification}>인증하기</PhoneButton>
        </PhoneInputWrapper>
        {isVerificationStarted && (
          <S.Input
            placeholder="인증코드를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        )}
      </S.MainWrapper>

      <S.Link onPress={() => navigation.navigate("Login")}>
        이미 아이디가 있으신가요?
      </S.Link>
      {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

      <S.Button onPress={onRegister} disabled={isLoading}>
        <S.ButtonText>{isLoading ? "회원가입 중..." : "회원가입"}</S.ButtonText>
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

const PhoneInputWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const PhoneButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  cursor: pointer;
  color: #2882ff;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 10px;
`;
