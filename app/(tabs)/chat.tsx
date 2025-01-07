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
  };
  const day = new Date();
  const formattedDate = `${day.getHours()}:${day.getMinutes()}`;
  const sendChat = () => {};

  return (
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
        />
        <S.SendImage chat={chat} onPress={sendChat}>
          <Image source={require("../../assets/images/Send.png")} />
        </S.SendImage>
      </S.InputContainer>
    </S.Container>
  );
}
