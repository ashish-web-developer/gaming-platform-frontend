import { useEffect } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
import type {
  IConversation,
  IUsersWithConversation,
} from "@/types/store/slice/chat";

// styled components
import {
  StyledChatContainer,
  StyledTopBackground,
  StyledCenteredBackground,
  StyledChatAvatar,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledChatContent,
} from "@/styles/components/memory-game/chat/chat.style";

// local components
import ChatInput from "@/components/memory-game/chat/chat-input";
import ChatMessageContainer from "@/components/memory-game/chat/chat-message-container";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { updateDefaultUserConversation } from "@/store/slice/chat.slice";
import {
  // state
  active_user,
  // actions
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";
// hooks
import useAvatar from "@/hooks/profile.hook";
import { usePrivateChannel } from "@/hooks/pusher.hook";
import { useChatInitializer } from "@/hooks/memory-game/chat.hook";

const Chat: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.username ?? "");
  useChatInitializer();
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "ChatEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        dispatch(updateDefaultUserConversation(data));
        if (data.user.id == _active_user?.id) {
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
  ]);

  return (
    <StyledChatContainer>
      <StyledTopBackground>
        <StyledChatAvatar dangerouslySetInnerHTML={{ __html: user_avatar }} />
        <StyledVersusContainer>
          <StyledVersusText>
            {_user.name?.split(" ")[0]}{" "}
            <span style={{ color: theme.palette.secondary.red }}>v/s</span>{" "}
            {_gaming_user?.name?.split(" ")[0]}
          </StyledVersusText>
          <StyledVersusImage
            width={40}
            height={40}
            alt="chips"
            src="/memory-game/start-banner/versus-container/chips.png"
          />
        </StyledVersusContainer>
      </StyledTopBackground>
      <StyledCenteredBackground $mode={_mode} />
      <StyledChatContent>
        <ChatMessageContainer />
        <ChatInput />
      </StyledChatContent>
    </StyledChatContainer>
  );
};

export default Chat;
