import { StyleSheet, Text, View, Image } from "react-native";

interface ChatProps {
  text: string;
}

export default function AiChat({ text }: ChatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.chat}>{text}</Text>
      <Image
        source={require("../../assets/images/AiChatTale.png")}
        style={styles.tale}
      />
      <View style={styles.profile}>
        <Text style={styles.profileText}>AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: "-25%",
    width: "auto",
    height: "auto",
    maxWidth: "80%",
    backgroundColor: "#141414",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    position: "relative",
  },
  chat: {
    fontSize: 12,
    color: "white",
  },
  tale: {
    position: "absolute",
    bottom: -3,
    left: -6,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "white",
    left: -40,
    bottom: -20,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 12,
  },
});
