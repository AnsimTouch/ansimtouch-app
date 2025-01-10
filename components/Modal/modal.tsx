import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SERVER_URL } from "@env";
import { useGetMe } from "@/hooks/useGetMe";

interface SelectModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  title: string;
  detail: string;
}

export default function SelectModal({
  isModalVisible,
  setIsModalVisible,
  title,
  detail,
}: SelectModalProps) {
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };
  const { user } = useGetMe();
  const emergency = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${SERVER_URL}/emergency`,
        {},
        {
          params: { userId: user?.id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        console.log("보내기 성공");
        Alert.alert("긴급호출 했습니다.");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("전송에 실패했습니다.");
    }
  };

  return (
    <Modal animationType="fade" visible={isModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDetail}>{detail}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={onPressModalClose}
              style={[styles.modalButton, { backgroundColor: "#D9D9D9" }]}
            >
              <Text style={styles.modalCancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#FF3232" }]}
              onPress={emergency}
            >
              <Text style={styles.modalConfirmText}>실행</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(1, 1, 1, 0.3)",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    height: 183,
    backgroundColor: "white",
    borderRadius: 20,
  },
  textWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "85%",
  },
  buttonWrapper: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    width: "48%",
    height: 54,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 18,
  },
  modalConfirmText: {
    fontSize: 18,
    color: "white",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalDetail: {
    fontSize: 16,
  },
});
