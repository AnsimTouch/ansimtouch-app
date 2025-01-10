import { StyleSheet, Text, View } from "react-native";

interface DatelineProps {
  date: string;
}

export default function Dateline({ date }: DatelineProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text>{date}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  line: {
    width: "30%",
    height: 1,
    backgroundColor: "black",
  },
});
