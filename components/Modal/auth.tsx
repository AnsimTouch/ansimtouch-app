import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

interface SelectModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title: string;
  detail: string;
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Detail = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.Pressable`
  background-color: #007bff;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

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
      <Overlay>
        <ModalView>
          <Title>{title}</Title>
          <Detail>{detail}</Detail>
          <Button onPress={() => setIsModalVisible(false)}>
            <ButtonText>확인</ButtonText>
          </Button>
        </ModalView>
      </Overlay>
    </Modal>
  );
};

export default SelectModal;
