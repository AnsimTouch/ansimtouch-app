import { View, Text, StyleSheet } from "react-native";
import { userProps } from "./home";

export default function UserBox({ name, state }: userProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name} 님 접속 상태</Text>
      <View style={styles.stateBox}>
        <Text style={styles.state}>·</Text>
        <Text style={styles.state}>{state}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ECF4FF",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
    padding: 5,
  },
  name: {
    fontSize: 10,
    fontWeight: "700",
  },
  stateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  state: {
    fontSize: 10,
    color: "#2882FF",
    fontWeight: "500",
    marginLeft: 5,
  },
});
