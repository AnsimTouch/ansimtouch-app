import { StyleSheet, Text, View, Image } from "react-native";

interface ChatProps {
  text: string;
  date: string;
}

export default function MyChat({ text, date }: ChatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{date}</Text>
      <Text style={styles.chat}>{text}</Text>
      <View style={styles.user}>
        <Text>나</Text>
      </View>
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
    maxWidth: "60%",
    position: "relative",
    right: "12%",
    marginBottom: 20,
    alignSelf: "flex-end",
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
  user: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    bottom: -20,
    right: "-17%",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
