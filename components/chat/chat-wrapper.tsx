// type
import type Colors from "@/types/data/colors";
import type { FC } from "react";
// local components
import ChatMessage from "./chat-message";

// styled components
import { StyledChatWrapper } from "@/styles/components/chat/chat-wrapper.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import {
  active_user_conversation,
  active_user,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// helpers
import { readableFormatDate } from "@/helpers/common";

// helpers package
import { v4 as uuidv4 } from "uuid";

interface Props {
  colors: Colors;
}
const ChatWrapper: FC<Props> = ({ colors }) => {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  return (
    <>
      <StyledChatWrapper>
        {_active_user_conversation.map((conversation) => {
          return (
            <ChatMessage
              colors={colors}
              flexDirection={
                conversation.sender_id == _user.id ? "row-reverse" : "row"
              }
              align={
                conversation.sender_id == _user.id ? "flex-end" : "flex-start"
              }
              username={
                conversation.sender_id == _user.id
                  ? (_user.username as string)
                  : (_active_user?.username as string)
              }
              name={
                conversation.sender_id == _user.id
                  ? (_user.name as string)
                  : (_active_user?.name as string)
              }
              backgroundColor = {
                conversation.sender_id == _user.id
                  ? "#6b8afd"
                  : "#2e333d"
              }
              chatTimeColor={
                conversation.sender_id == _user.id
                  ? "#ffffff"
                  : "#959495"

              }
              key={uuidv4()}
              message={conversation.message}
              date={readableFormatDate(conversation.created_at)}
            />
          );
        })}
      </StyledChatWrapper>
    </>
  );
};

export default ChatWrapper;
