import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable, View } from "react-native";
import * as S from "../../style/auth";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onRegister = () => {
    if (email && password) {
      alert("회원가입 성공!");
      navigation.navigate("Login");
    } else {
      alert("모든 필드를 입력하세요.");
    }
  };

  return (
    <View style={S.styles.container}>
      <Nav title="회원가입" router="Register" />
      <View style={S.styles.mainWrapper}>
        <Text style={styles.title}>회원가입</Text>
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
        <Pressable style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
