import React from "react";
import { Modal, Text, View, StyleSheet, Pressable } from "react-native";

interface SelectModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title: string;
  detail: string;
}

const SelectModal: React.FC<SelectModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  detail,
}) => {
  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>
          <Pressable
            style={styles.button}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SelectModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
