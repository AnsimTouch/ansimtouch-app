import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";
import { useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

export default function Chat() {
  const [chat, setChat] = useState<string>("");
  const handleChatChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setChat(e.nativeEvent.text);
    console.log(chat);
  };

  return (
    <S.Container>
      <Nav title="채팅하기" router="Home" />
      <MyChat text="나입니gdajadgoiadgiahdiㅏadgdgdggdadadgadgadgadgagdgafhhffshsfhfhfshfshsfhsfhsfhfsdfshfh" />
      <AiChat text="누구야" />
      <S.InputContainer>
        <S.ChatView
          placeholder="채팅을 입력해 주세요."
          onChange={handleChatChange}
        />
        <S.SendImage chat={chat}>
          <Image source={require("../../assets/images/Send.png")} />
        </S.SendImage>
      </S.InputContainer>
    </S.Container>
  );
}
