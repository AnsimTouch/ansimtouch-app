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

export default function ChangePassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const apiKey = "skjdklas"; // 임시 API 키

  const onChangePassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`https://${apiKey}/change-password`, {
        password,
      });

      if (response.status === 200) {
        setModalMessage("비밀번호가 성공적으로 수정되었습니다.");
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("비밀번호 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.AuthContainer>
      <Nav title="비밀번호 수정" router="ChangePassword" />

      <S.MainWrapper>
        <S.Title>비밀번호 수정</S.Title>
        <S.SubTitle>비밀번호를 수정합니다.</S.SubTitle>

        <S.Input
          placeholder="새 비밀번호를 입력해 주세요."
          placeholderTextColor="#4C4C4C"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <S.Input
          placeholder="비밀번호를 재입력해 주세요."
          placeholderTextColor="#4C4C4C"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </S.MainWrapper>

      {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}

      <S.Button onPress={onChangePassword} disabled={isLoading}>
        <S.ButtonText>
          {isLoading ? "수정 중..." : "비밀번호 수정"}
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
