import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@env";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList, // FlatList 추가
} from "react-native";

export default function Chat() {
  const accessToken =
    "eyJhbGciOiJIUzM4NCJ9.eyJpZCI6NCwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTczNjMwNjQ1NiwiZXhwIjoxNzM2MzEwMDU2fQ.TCmp-ajN1boqM730bHK3gJrLekGhc55AWF5734BV8qXW2W_7wVUrRhNOUjYP5-cd";
  const [chatList, setChatList] = useState<any[]>([]);
  const [chat, setChat] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const postChat = async () => {
    try {
      const res = await axios.post(
        `${SERVER_URL}/chat/send`,
        { message: chat },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        setChat("");
        getChat();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getChat = async () => {
    try {
      console.log(`${SERVER_URL}`);
      const res = await axios.get(`${SERVER_URL}/chat/history`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res) {
        console.log("성공");
        setChatList(res.data);
      }
    } catch (e) {
      console.error("받기 실패", e);
    }
  };

  const handleChatChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setChat(e.nativeEvent.text);
  };

  const renderItem = ({ item }: { item: any }) => {
    // 채팅 랜더림ㅇ
    return item.role === "assistant" ? (
      <AiChat text={item.content} date={item.timestamp} />
    ) : (
      <MyChat text={item.content} date={item.timestamp} />
    );
  };

  useEffect(() => {
    const didShow = Keyboard.addListener("keyboardWillShow", () =>
      setKeyboardVisible(true)
    );
    const didHide = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  });

  useEffect(() => {
    if (chatList.length === 0) {
      getChat();
    }
  });

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        height: "100%",
        marginBottom: isKeyboardVisible ? "80%" : "0%",
      }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <S.Container>
        <Nav title="채팅하기" router="Home" />
        <FlatList
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            marginBottom: "40%",
          }}
          data={chatList}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
        {/* 입력창 */}
        <S.InputContainer>
          <S.ChatView
            placeholder="채팅을 입력해 주세요."
            onChange={handleChatChange}
            multiline={true}
            value={chat}
            returnKeyType="send" // 키보드에서 전송 버튼 처리
            onSubmitEditing={postChat} // 엔터 누를 때 전송
          />
          <S.SendImage chat={chat} onPress={postChat}>
            <Image source={require("../../assets/images/Send.png")} />
          </S.SendImage>
        </S.InputContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
}
