import { StyleSheet, Text, View, Image } from "react-native";

interface ChatProps {
  text: string;
}

export default function MyChat({ text }: ChatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>12:10</Text>
      <Text style={styles.chat}>{text}</Text>
      <View style={styles.tale}>
        <Image source={require("../../assets/images/ChatTale.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    backgroundColor: "#ECF4FF",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    position: "relative",
    maxWidth: "50%",
  },
  time: {
    position: "absolute",
    bottom: 0,
    left: -30,
    fontSize: 10,
  },
  chat: {
    fontSize: 12,
  },
  tale: {
    position: "absolute",
    bottom: -4,
    right: 0,
  },
});
