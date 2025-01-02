import {
  StyleSheet,
  Text,
  Image,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import * as S from "../../style/emergency";
import Nav from "@/components/Nav/nav";
import { useEffect, useState } from "react";

export default function Emergency() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {}, []);

  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <S.Container>
      <Nav title="긴급 알림" router="User" />
      <S.MainWrapper>
        <S.ContentWrapper>
          <Image source={require("../../assets/images/Emergency.png")} />
          <Text style={styles.text}>긴급 알림을 실행합니다.</Text>
          <S.Button onPress={onPressModalOpen}>
            <Text style={styles.buttonText}>긴급 알림 실행</Text>
          </S.Button>
        </S.ContentWrapper>
      </S.MainWrapper>
      <S.ModalView>
        <Modal animationType="fade" visible={isModalVisible} transparent={true}>
          <S.ModalContainer>
            <S.ModalWrapper>
              <S.ModalText>
                <Text style={styles.modalTitle}>
                  정말로 알림을{`\n`}실행하시겠습니까?
                </Text>
                <Text style={styles.modalDetail}>
                  해당 알림은 취소 할 수 없습니다.
                </Text>
              </S.ModalText>
              <S.ButtonWrapper>
                <S.ModalButton onPress={onPressModalClose} color="#D9D9D9">
                  <Text style={styles.modalCancelText}>취소</Text>
                </S.ModalButton>
                <S.ModalButton color="#FF3232">
                  <Text style={styles.modalConfirmText}>실행</Text>
                </S.ModalButton>
              </S.ButtonWrapper>
            </S.ModalWrapper>
          </S.ModalContainer>
        </Modal>
      </S.ModalView>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: 700,
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
    fontWeight: 600,
  },
  modalDetail: {
    fontSize: 16,
  },
});
