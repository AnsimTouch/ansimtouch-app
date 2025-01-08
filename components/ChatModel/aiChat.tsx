import { StyleSheet, Text, View, Image } from "react-native";

interface ChatProps {
  text: string;
  date: string;
}

export default function AiChat({ text, date }: ChatProps) {
  const formattedDate = date.slice(11, 16);
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedDate}</Text>
      <Text style={styles.chat}>{text}</Text>
      <View style={styles.user}>
        <Text>AI</Text>
      </View>
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
    left: "12%",
    maxWidth: "60%",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  time: {
    position: "absolute",
    bottom: 0,
    right: -30,
    fontSize: 10,
  },
  chat: {
    fontSize: 16,
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    color: "white",
  },
  tale: {
    position: "absolute",
    bottom: -4,
    left: 0,
  },
  user: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    bottom: -20,
    left: "-17%",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
