import { StyleSheet, Text, View, Image } from "react-native";
import Svg, { Path } from "react-native-svg";

interface ChatProps {
  text: string;
}

export default function MyChat({ text }: ChatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.chat}>{text}</Text>
      <View style={styles.tale}>
        <Svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M11.084 9.77345C6.0301 10.8708 2.18226 7.71588 0.890073 6.00124L1.03365 0.85732C2.42155 1.20025 5.42708 1.50888 6.34597 0C6.20239 6.1727 10.079 9.25906 11.084 9.77345Z"
            fill="#ECF4FF"
          />
        </Svg>
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
    borderRadius: 5,
    position: "relative",
  },
  chat: {
    fontSize: 12,
  },
  tale: {
    position: "absolute",
    bottom: -6,
    right: -7,
  },
});
