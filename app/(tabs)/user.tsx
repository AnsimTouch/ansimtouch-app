import {
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Animated,
  Image,
} from "react-native";
import * as S from "../../style/user";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import Nav from "@/components/Nav/nav";
import UserBox from "@/components/UserBox/userBox";
import { userType } from "@/components/UserBox/userType";
import {
  Swipeable, // 줄 그어지는 거 무시
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import SelectModal from "@/components/Modal/modal";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useGetMe";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type RootStackParamList = {
  AddUser: undefined;
};

export default function User() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>("");
  const { user, fetchUser } = useGetMe();
  const [userList, setUserList] = useState<any[]>([]);

  const onRelationship = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.get(`${SERVER_URL}/user/realationship`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userId: user?.id },
      });
      if (res) {
        setUserList(res.data);
        console.log(res.data);
      }
    } catch (e) {
      console.error("받기 실패", e);
    }
  };

  useEffect(() => {
    onRelationship();
    fetchUser();
  }, []);

  const onPressModalOpen = (name: string) => {
    setIsModalVisible(true);
    setSelectedName(name);
  };

  const renderRightActions = (
    // 옆으로 당기면 삭제
    dragX: Animated.AnimatedInterpolation<number>,
    name: string
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1], // 얼마나 당겨지는지
    });
    return (
      <Pressable onPress={() => onPressModalOpen(name)}>
        <Animated.View // 당겼을 때 나오는 뷰
          style={[
            styles.delete,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Image source={require("../../assets/images/Delete.png")} />
        </Animated.View>
      </Pressable>
    );
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <Nav title="유저 관리" router="User" />
      <S.MainWrapper>
        <S.MenuTable>
          <S.Title>관리 유저</S.Title>
          <S.UserButton onPress={() => navigation.navigate("AddUser")}>
            <Text style={{ color: "white" }}>추가하기</Text>
          </S.UserButton>
        </S.MenuTable>
        <FlatList<userType>
          style={styles.FlatList}
          data={userList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <Swipeable // 줄 그어지는 거 무시
                renderRightActions={(dragX) =>
                  renderRightActions(dragX, item.name)
                }
              >
                <UserBox
                  name={item.name}
                  number={item.number}
                  state={item.state}
                />
              </Swipeable>
            </GestureHandlerRootView>
          )}
        />
      </S.MainWrapper>
      <S.ModalView>
        <SelectModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title={`${selectedName} 님을 삭제합니다.`}
          detail="삭제를 누르면 관계가 삭제됩니다."
        />
      </S.ModalView>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  FlatList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  delete: {
    width: 40,
    height: 84,
    backgroundColor: "#FF3232",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
