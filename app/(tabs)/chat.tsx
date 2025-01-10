import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dateline from "@/components/ChatModel/dateline";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList,
} from "react-native";

export default function Chat() {
  const [chatList, setChatList] = useState<any[]>([]);
  const [chat, setChat] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [prevDate, setPrevDate] = useState<string>("");

  const postChat = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
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
        getChat(); // 메시지 전송 후 채팅 기록을 다시 불러옵니다.
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getChat = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.get(`${SERVER_URL}/chat/history`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res) {
        setChatList((prevChatList) => [...prevChatList, ...res.data]);
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
    const currentDate = item.timestamp.slice(0, 10);

    const shouldRenderDateline = prevDate !== currentDate;

    if (item.role === "assistant") {
      return (
        <>
          {shouldRenderDateline && <Dateline date={currentDate} />}
          <AiChat text={item.content} date={item.timestamp} />
          {shouldRenderDateline && setPrevDate(currentDate)}{" "}
        </>
      );
    } else {
      return (
        <>
          {shouldRenderDateline && <Dateline date={currentDate} />}
          <MyChat text={item.content} date={item.timestamp} />
          {shouldRenderDateline && setPrevDate(currentDate)}{" "}
        </>
      );
    }
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
  }, []);

  useEffect(() => {
    getChat(); // 초기 채팅 기록 가져오기
  }, []); // 빈 배열을 사용하여 처음 한번만 호출

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
