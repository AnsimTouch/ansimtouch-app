import * as S from "../../style/chat";
import Nav from "@/components/Nav/nav";
import MyChat from "@/components/ChatModel/myChat";
import AiChat from "@/components/ChatModel/aiChat";

export default function Chat() {
  return (
    <S.Container>
      <Nav title="채팅하기" router="Home" />
      <S.ChatWrapper>
        <MyChat text="나입니ㅏ" />
        <AiChat text="dnadfjg" />
      </S.ChatWrapper>
    </S.Container>
  );
}
