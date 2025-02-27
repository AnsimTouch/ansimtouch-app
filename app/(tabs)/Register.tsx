import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import SelectModal from "@/components/Modal/auth";
import * as S from "../../style/auth";
import styled from "styled-components/native";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SERVER_URL } from "@env";

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
  const [isParent, setIsParent] = useState<boolean>(true);
  const [isVerify, setIsVerify] = useState<boolean>(true);

  const handleCheckboxChange = (value: boolean) => {
    setIsParent(value);
  };

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
    if (isVerify) {
      try {
        const response = await axios.post(`${SERVER_URL}/auth/sign-up`, {
          username: name,
          tel: phoneNumber,
          password: password,
          userType: isParent ? "Protector" : "Ward",
        });
        if (response.status === 200) {
          setIsLoading(false);
          setModalMessage("회원가입 성공!");
          setIsModalVisible(true);
          setTimeout(() => navigation.navigate("Login"), 2000);
        }
      } catch (error) {
        setIsLoading(false);
        setModalMessage("회원가입 실패! 다시 시도해 주세요.");
        setIsModalVisible(true);
      }
    } else {
      setModalMessage("전화번호 인증을 진행해 주세요.");
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
      .post(`${SERVER_URL}/verify/send`, { tel: phoneNumber })
      .then(() => {
        setModalMessage("인증 코드가 발송되었습니다.");
        setIsModalVisible(true);
      })
      .catch(() => {
        setModalMessage("인증 코드 발송에 실패했습니다. 다시 시도해주세요.");
        setIsModalVisible(true);
      });
  };

  const onCheckCode = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/verify/check`, {
        tel: phoneNumber,
        code: verificationCode,
      });
      if (response.status === 200) {
        setIsVerify(true);
        console.log("인증 성공");
        setModalMessage("인증에 성공했습니다.");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <S.PhoneInputWrapper>
            <S.Input
              placeholder="전화번호를 입력해주세요."
              placeholderTextColor="#4C4C4C"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              style={{ flex: 1 }}
              maxLength={11}
            ></S.Input>
            <S.PhoneButton onPress={onRequestVerification}>
              <S.PhoneText>인증하기</S.PhoneText>
            </S.PhoneButton>
          </S.PhoneInputWrapper>
          {isVerificationStarted && (
            <S.PhoneInputWrapper>
              <S.Input
                placeholder="인증코드를 입력해주세요."
                placeholderTextColor="#4C4C4C"
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <S.PhoneButton onPress={onCheckCode}>
                <S.PhoneText>인증하기</S.PhoneText>
              </S.PhoneButton>
            </S.PhoneInputWrapper>
          )}
        </S.MainWrapper>

        <CheckboxWrapper>
          <CustomCheckbox
            value={isParent}
            onValueChange={() => handleCheckboxChange(true)}
            label="보호자로 가입"
          />
          <CustomCheckbox
            value={!isParent}
            onValueChange={() => handleCheckboxChange(false)}
            label="대상자로 가입"
          />
        </CheckboxWrapper>

        {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

        <S.Button onPress={onRegister} disabled={isLoading}>
          <S.ButtonText>
            {isLoading ? "회원가입 중..." : "회원가입"}
          </S.ButtonText>
        </S.Button>

        <SelectModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title="알림"
          detail={modalMessage}
        />
      </S.AuthContainer>
    </TouchableWithoutFeedback>
  );
}

const CheckboxWrapper = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5%;
  margin-bottom: 10px;
`;

const CheckboxSquare = styled.View<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const CheckboxLabel = styled.Text`
  font-size: 12px;
  color: #4c4c4c;
`;

const CheckMark = styled.Text`
  color: #2882ff;
  font-size: 14px;
  font-weight: bold;
`;

const CustomCheckbox = ({
  value,
  onValueChange,
  label,
}: {
  value: boolean;
  onValueChange: () => void;
  label: string;
}) => (
  <TouchableOpacity
    onPress={onValueChange}
    style={{ flexDirection: "row", alignItems: "center", marginRight: 13 }}
  >
    <CheckboxSquare checked={value}>
      {value && <CheckMark>✔</CheckMark>}
    </CheckboxSquare>
    <CheckboxLabel>{label}</CheckboxLabel>
  </TouchableOpacity>
);
