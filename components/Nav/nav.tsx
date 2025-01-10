import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Locate: undefined;
  Taxi: undefined;
  Emergency: undefined;
  ChangePassword: undefined;
  ChangePhone: undefined;
  Chat: undefined;
  Home: undefined;
  Check: undefined;
  Alarm: undefined;
  AddUser: undefined;
  User: undefined;
  Profile: undefined;
  Register: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

interface NavProps {
  title: string;
  router: keyof RootStackParamList;
}

export default function Nav({ title, router }: NavProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigate = () => {
    navigation.navigate(router);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleNavigate} style={{ height: "100%" }}>
        <Image source={require("../../assets/images/Arrow.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "90%",
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
    alignContent: "center",
    height: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
});
