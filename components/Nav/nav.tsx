import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "expo-router";

interface NavProps {
  title: string;
  router: string;
}

export default function Nav({ title, router }: NavProps) {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (navigation.canGoBack()) {
      navigation.navigate(router as never);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleNavigate}>
        <Image source={require("../../assets/images/Arrow.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
    alignContent: "center",
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
});
