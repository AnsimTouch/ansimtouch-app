import React, { useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

interface SelectModalProps {
  isModalVisible: boolean;
  onClose: () => void;
  title: string;
  detail: string;
  onSave: (newData: string) => Promise<void>;
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

const Input = styled.TextInput.attrs({
  placeholderTextColor: "#4C4C4C",
})`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.Pressable<{ isCancel?: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isCancel ? "#ccc" : "#007bff")};
  padding-vertical: 10px;
  padding-horizontal: 20px;
  margin: 0 5px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const SelectModal: React.FC<SelectModalProps> = ({
  isModalVisible,
  onClose,
  title,
  detail,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState<string>(detail);

  const handleSave = () => {
    if (inputValue.trim() === "") {
      alert("입력값을 확인해주세요.");
      return;
    }
    onSave(inputValue);
  };

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalView>
          <Title>{title}</Title>
          <Input
            placeholder="수정할 내용을 입력하세요"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <ButtonContainer>
            <Button isCancel onPress={onClose}>
              <ButtonText>취소</ButtonText>
            </Button>
            <Button onPress={handleSave}>
              <ButtonText>저장</ButtonText>
            </Button>
          </ButtonContainer>
        </ModalView>
      </Overlay>
    </Modal>
  );
};

export default SelectModal;
