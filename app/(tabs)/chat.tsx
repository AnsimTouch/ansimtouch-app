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
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList, // FlatList 추가
} from "react-native";

export default function Chat() {
  const accessToken =
    "eyJhbGciOiJIUzM4NCJ9.eyJpZCI6NCwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTczNjI1MTYyOCwiZXhwIjoxNzM2MjU1MjI4fQ.cWlvkEMj52c8PTOlI0IwwS3hlpcd63ST5CkcfMwv0NpUKZdfWknpFEnb30zvOPpd";
  const [chatList, setChatList] = useState<any[]>([]);
  const [chat, setChat] = useState<string>("");

  const postChat = async () => {
    try {
      const res = await axios.post(
        `${SERVER_URL}chat/send`,
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
      const res = await axios.get(`${SERVER_URL}chat/history`, {
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

  useEffect(() => {
    getChat();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    // 채팅 랜더림ㅇ
    return item.role === "assistant" ? (
      <AiChat text={item.content} date={item.date} />
    ) : (
      <MyChat text={item.content} date={item.date} />
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // iOS 키보드 위치 보정
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <Nav title="채팅하기" router="Home" />

          {/* FlatList 설정 */}
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={chatList}
            renderItem={renderItem}
            inverted={true}
            contentContainerStyle={{ paddingBottom: 10 }}
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
              blurOnSubmit={false} // 입력 후 키보드 유지
              onSubmitEditing={postChat} // 엔터 누를 때 전송
            />
            <S.SendImage chat={chat} onPress={postChat}>
              <Image source={require("../../assets/images/Send.png")} />
            </S.SendImage>
          </S.InputContainer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
