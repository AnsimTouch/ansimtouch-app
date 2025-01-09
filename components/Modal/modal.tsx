import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
