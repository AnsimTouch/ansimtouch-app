import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // accesstoken 들고오기
  const loadAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accesstoken");
      if (token) {
        setAccessToken(token);
      } else {
        console.error("Access token not found");
      }
    } catch (e) {
      console.error("Failed to load access token", e);
    }
  };

  useEffect(() => {
    loadAccessToken();
  }, []);

  const [chat, setChat] = useState<string>("");

  const sendChat = async () => {
    try {
      if (!accessToken) {
        console.error("Access token is not available");
        return;
      }

      console.log(`${SERVER_URL}`);
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
        console.log("성공");
        setChat("");
      }
    } catch (e) {
      console.error("Error sending chat:", e);
    }
  };

  const handleChatChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setChat(e.nativeEvent.text);
  };

  const day = new Date();
  const formattedDate = `${day.getHours()}:${day.getMinutes()}`;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 키보드 나오면 따라서 올라감
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              value={chat}
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
