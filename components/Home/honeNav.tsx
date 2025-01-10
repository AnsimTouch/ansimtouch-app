import { TouchableOpacity, Image } from "react-native";
import * as S from "../../style/home";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  [key: string]: undefined;
};
export default function HomeNav() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // 네비게이션 사용
  return (
    <S.Nav>
      <S.NavTitle>안심터치</S.NavTitle>
      <S.NavImage>
        <TouchableOpacity onPress={() => navigation.navigate("Alarm")}>
          <Image source={require("../../assets/images/Bell.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../../assets/images/Setting.png")} />
        </TouchableOpacity>
      </S.NavImage>
    </S.Nav>
  );
}
