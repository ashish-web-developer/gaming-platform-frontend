import { useRef } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledContainer,
  StyledDivider,
  StyledHeader,
  StyledMainText,
  StyledCloseIcon,
  StyledMessagesContainer,
  StyledMessageInputContainer,
  StyledInput,
  StyledSendCta,
  StyledMessageContainer,
  StyledProfileContainer,
  StyledUserProfile,
  StyledMessageUserName,
  StyledMessage,
} from "@/styles/components/memory-game/live-stream-chat/mobile/mobile-live-stream-chat.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  live_stream_chat_list,
  updateShowChatStreamingModal,
} from "@/store/slice/memory-game.slice";
import { liveStreamChatApi } from "@/store/slice/game.slice";
import { IUsersWithConversation } from "@/types/store/slice/chat";

// hooks
import useAvatar from "@/hooks/profile.hook";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 15 16"
    >
      <path
        fill={color}
        d="M1.218.5L0 1.718 6.282 8 0 14.282 1.218 15.5 7.5 9.218l6.282 6.282L15 14.282 8.718 8 15 1.718 13.782.5 7.5 6.782 1.218.5z"
      ></path>
    </svg>
  );
};

const SendIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 30 28"
    >
      <path
        fill={color}
        d="M29.915 2.549l-4.528 23.76c-.341 1.678-1.232 2.095-2.498 1.305l-6.898-5.657-3.328 3.563c-.368.41-.676.753-1.386.753l.495-7.819L24.557 5.597c.556-.551-.12-.857-.864-.305L7.888 16.367l-6.804-2.37c-1.48-.514-1.507-1.647.308-2.437L28.006.15c1.232-.515 2.31.305 1.909 2.399z"
      ></path>
    </svg>
  );
};

const Message: FC<{ user: IUsersWithConversation; message: string }> = ({
  user,
  message,
}) => {
  const user_avatar = useAvatar(user.username);
  return (
    <StyledMessageContainer>
      <StyledProfileContainer>
        <StyledUserProfile
          dangerouslySetInnerHTML={{
            __html: user_avatar,
          }}
        />
        <StyledMessageUserName>{user.name}</StyledMessageUserName>
      </StyledProfileContainer>
      <StyledMessage>{message}</StyledMessage>
    </StyledMessageContainer>
  );
};

const LiveStreamChat: FC = () => {
  const dispatch = useAppDispatch();
  const input_ref = useRef<HTMLInputElement>(null);
  const _live_stream_chat_list = useAppSelector(live_stream_chat_list);
  const theme = useTheme() as CustomMemoryGameThemePalette;
  return (
    <StyledContainer>
      <StyledDivider />
      <StyledHeader>
        <StyledMainText>Live Chat</StyledMainText>
        <StyledCloseIcon
          onClick={() => dispatch(updateShowChatStreamingModal(false))}
        >
          <CloseIcon size={15} color="#fff" />
        </StyledCloseIcon>
      </StyledHeader>
      <StyledMessagesContainer>
        {_live_stream_chat_list.map((chat) => {
          return <Message {...chat} />;
        })}
      </StyledMessagesContainer>
      <StyledMessageInputContainer>
        <StyledInput
          onKeyDown={(event) => {
            if (
              input_ref.current?.value &&
              (event.metaKey || event.ctrlKey) &&
              event.key == "Enter"
            ) {
              dispatch(liveStreamChatApi({ message: input_ref.current.value }));
              input_ref.current.value = "";
            }
          }}
          type="text"
          ref={input_ref}
          placeholder="Write Here"
        />
        <StyledSendCta
          onClick={() => {
            if (input_ref.current) {
              dispatch(liveStreamChatApi({ message: input_ref.current.value }));
              input_ref.current.value = "";
            }
          }}
        >
          <SendIcon size={30} color={theme.palette.live_stream_chat.border} />
        </StyledSendCta>
      </StyledMessageInputContainer>
    </StyledContainer>
  );
};
export default LiveStreamChat;
