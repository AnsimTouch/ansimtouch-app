import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable, View } from "react-native";
import SelectModal from "@/components/Modal/auth";
import * as S from "../../style/auth";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const onLogin = () => {
    if (email && password) {
      setModalMessage("로그인 성공!");
      setIsModalVisible(true);
    } else {
      setModalMessage("이메일과 비밀번호를 입력하세요.");
      setIsModalVisible(true);
    }
  };

  return (
    <View style={S.styles.container}>
      <Nav title="로그인" router="Login" />
      <View style={S.styles.mainWrapper}>
        <View style={styles.logoWrapper}></View>
        <Text style={styles.title}>로그인</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>회원가입</Text>
        </Pressable>
      </View>
      <SelectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="알림"
        detail={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#007BFF",
    textAlign: "center",
  },
});
