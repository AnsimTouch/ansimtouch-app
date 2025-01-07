import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

export default function Chat() {
  const [chat, setChat] = useState<string>("");
  const handleChatChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setChat(e.nativeEvent.text);
  };
  const day = new Date();
  const formattedDate = `${day.getHours()}:${day.getMinutes()}`;
  const sendChat = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 키보드 나오면 따라서 올라감
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/*밖에 누르먄 키보드 사라짐*/}
        <S.Container>
          <Nav title="채팅하기" router="Home" />
          <MyChat
            text="나입니gdajadgoiadgiahdiㅏadgdgdggdadadgadgadgadgagdgafhhffshsfhfhfshfshsfhsfhsfhfsdfshfh"
            date={formattedDate}
          />
          <AiChat
            text="sadgadgadgadgdgadgdgagddgadgdagdgadgdgadg"
            date={formattedDate}
          />
          <S.InputContainer>
            <S.ChatView
              placeholder="채팅을 입력해 주세요."
              onChange={handleChatChange}
              multiline={true}
            />
            <S.SendImage chat={chat} onPress={sendChat}>
              <Image source={require("../../assets/images/Send.png")} />
            </S.SendImage>
          </S.InputContainer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
