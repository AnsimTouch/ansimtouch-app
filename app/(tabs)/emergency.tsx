import { StyleSheet, Text, Image } from "react-native";
import * as S from "../../style/emergency";
import Nav from "@/components/Nav/nav";
import { useState } from "react";
import SelectModal from "@/components/Modal/modal";

export default function Emergency() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <S.Container>
      <Nav title="긴급 알림" router="Main" />
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
        <SelectModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title={`정말로 알림을${`\n`}실행하시겠습니까?`}
          detail="해당 알림은 취소 할 수 없습니다."
        />
      </S.ModalView>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 700,
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
