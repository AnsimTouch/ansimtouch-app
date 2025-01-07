import { StyleSheet, Text, View, Image } from "react-native";

interface ChatProps {
  text: string;
}

export default function AiChat({ text }: ChatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>12:10</Text>
      <Text style={styles.chat}>{text}</Text>
      <View style={styles.tale}>
        <Image source={require("../../assets/images/AiChatTale.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    backgroundColor: "#141414",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    position: "relative",
    right: "30%",
  },
  time: {
    position: "absolute",
    bottom: 0,
    right: -30,
    fontSize: 10,
  },
  chat: {
    fontSize: 12,
    color: "white",
  },
  tale: {
    position: "absolute",
    bottom: -4,
    left: 0,
  },
});
