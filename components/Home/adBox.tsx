import { Image, StyleSheet, View } from "react-native";

export default function AdBox() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Advertise.png")}
        style={styles.container}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
});
