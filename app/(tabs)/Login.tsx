import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import SelectModal from "@/components/Modal/auth";
import * as S from "../../style/auth";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const onLogin = async () => {
    if (phone && password) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${SERVER_URL}/auth/login`, {
          tel: phone,
          password: password,
        });
        if (response.status === 200) {
          setIsLoading(false);
          setModalMessage("로그인 성공!");
          setIsModalVisible(true);
          await AsyncStorage.setItem(
            "accessToken",
            response.data.data.accessToken
          );
          await AsyncStorage.setItem(
            "refreshToken",
            response.data.data.refreshToken
          );
          setTimeout(() => navigation.navigate("Home"), 1000); // 로그인 성공 후 홈 화면으로 이동
        }
      } catch (error) {
        setIsLoading(false);
        setModalMessage("로그인 실패! 다시 시도해주세요.");
        setIsModalVisible(true);
        console.log(error);
      }
    } else {
      setErrorMessage("모든 필드를 입력하세요.");
    }
  };

  useEffect(() => {});

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.AuthContainer>
        <S.MainWrapper>
          <S.Title>로그인</S.Title>
          <S.SubTitle>로그인 후 진행해주세요.</S.SubTitle>
          <S.Input
            placeholder="전화번호를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            value={phone}
            onChangeText={setPhone}
          />
          <S.Input
            placeholder="비밀번호를 입력해주세요."
            placeholderTextColor="#4C4C4C"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </S.MainWrapper>

        {/* 임시 */}
        <S.Link onPress={() => navigation.navigate("ForgotPassword")}>
          <S.LinkText>비밀번호를 잊으셨나요?</S.LinkText>
        </S.Link>
        <S.Link onPress={() => navigation.navigate("Register")}>
          <S.LinkText>회원가입</S.LinkText>
        </S.Link>
        {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

        <S.Button onPress={onLogin} disabled={isLoading}>
          <S.ButtonText>{isLoading ? "로그인 중..." : "로그인"}</S.ButtonText>
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
