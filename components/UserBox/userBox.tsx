import { StyleSheet, View, Text } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface UserProps {
  name: string;
  number: string;
}

export default function UserBox({ name, number }: UserProps) {
  state: string;
}

export default function UserBox({ name, number, state }: UserProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>{number}</Text>
        </View>
        <Text
          style={{
            color: state === "현재 접속 중" ? "#2882FF" : "#4C4C4C",
            fontWeight: 600,
          }}
        >
          {state}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 84,
    backgroundColor: "#ECF4FF",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
  },
  number: {
    fontSize: 14,
    fontWeight: 700,
    color: "#4C4C4C",
  },
  wrapper: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
  },
});
