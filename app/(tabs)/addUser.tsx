import { Text, TouchableOpacity, View, Image } from "react-native";
import * as S from "../../style/user";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
  User: undefined;
};
export default function AddUser() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Image source={require("../../assets/images/Arrow.png")} />
        </TouchableOpacity>
        <Text>유저관리</Text>
      </View>
    </S.Container>
  );
}
