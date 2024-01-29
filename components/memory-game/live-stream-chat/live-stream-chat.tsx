import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { User } from "@/types/user";
import type { ITheme } from "@/theme/memory-game.theme";
// styled components
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledMainText,
  StyledBannerAvatarContainer,
  StyledBannerGirlContainer,
  StyledBannerGirlImage,
  StyledBannerTextPatternContainer,
  StyledPlayButtonContainer,
  StyledAvatarGroup,
  StyledAvatar,
  StyledInstructAvatar,
  StyledImage,
  StyledChatMainContainer,
  StyledMessageContainer,
  StyledInputContainer,
  StyledInput,
  StyledSentCta,
  StyledMessage,
  StyledMessageHeader,
  StyledUserName,
  StyledMessageText,
} from "@/styles/components/memory-game/live-stream-chat/live-stream-chat.style";
// local components
import TextPattern from "@/components/memory-game/live-stream-chat/text-pattern";
import PlayButtonPattern from "@/components/memory-game/live-stream-chat/play-button-pattern";
// styled theme
import { useTheme } from "styled-components";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { gaming_user } from "@/store/slice/game.slice";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";
import {
  live_stream_chat_list,
  show_live_stream_chat,
  updateShowLiveSteamChat,
} from "@/store/slice/memory-game.slice";
import { liveStreamChatApi } from "@/store/slice/game.slice";
// hooks
import useAvatar from "@/hooks/profile.hook";

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

const Message: FC<{
  message: string;
  user: IUsersWithConversation;
}> = ({ user, message }) => {
  const user_avatar = useAvatar(user.username);
  return (
    <StyledMessage>
      <StyledMessageHeader>
        <StyledAvatar
          $size="30px"
          $border="2px solid #fff"
          dangerouslySetInnerHTML={{
            __html: user_avatar,
          }}
        />
        <StyledUserName>{user.name}</StyledUserName>
      </StyledMessageHeader>
      <StyledMessageText>{message}</StyledMessageText>
    </StyledMessage>
  );
};

import React from "react";

const LiveStreamBanner: FC<{
  user_avatar: string;
  gaming_user_avatar: string;
  user: User;
  gaming_user: IUsersWithConversation;
}> = ({ user_avatar, gaming_user_avatar, user, gaming_user }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  return (
    <StyledContainer>
      <StyledContent>
        <StyledBannerAvatarContainer>
          <StyledAvatarGroup>
            <StyledAvatar
              dangerouslySetInnerHTML={{
                __html: user_avatar,
              }}
              $size={"40px"}
              $border="2px solid #fff"
            />
            <StyledAvatar
              dangerouslySetInnerHTML={{
                __html: gaming_user_avatar,
              }}
              $size={"40px"}
              $border={`2px solid #fff`}
            />
          </StyledAvatarGroup>
        </StyledBannerAvatarContainer>
        {/* <StyledBannerGirlContainer>
          <StyledBannerGirlImage alt = {"girl"} fill = {true} src = "/memory-game/live-stream-chat/banner-girl.png"/>
        </StyledBannerGirlContainer> */}
        <StyledBannerTextPatternContainer>
          <TextPattern
            onClick={() => {
              dispatch(updateShowLiveSteamChat(true));
            }}
          >
            👉 Tap into your memory skills, chat with fellow gamers, and win
            cool prizes! 🎮💬
          </TextPattern>
        </StyledBannerTextPatternContainer>
        <StyledPlayButtonContainer>
          <PlayButtonPattern
            on_click={() => {
              dispatch(updateShowLiveSteamChat(true));
            }}
          >
            Chat Now
          </PlayButtonPattern>
        </StyledPlayButtonContainer>
      </StyledContent>
    </StyledContainer>
  );
};

const LiveStreamChat: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user?.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const _show_live_stream_chat = useAppSelector(show_live_stream_chat);
  const _live_stream_chat_list = useAppSelector(live_stream_chat_list);
  const input_ref = useRef<HTMLInputElement>(null);
  if (!_live_stream_chat_list.length && !_show_live_stream_chat) {
    return (
      <LiveStreamBanner
        user_avatar={user_avatar}
        gaming_user_avatar={gaming_user_avatar}
        user={_user}
        gaming_user={_gaming_user as IUsersWithConversation}
      />
    );
  }
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledMainText>Live Chat</StyledMainText>
        <StyledAvatarGroup>
          <StyledAvatar
            dangerouslySetInnerHTML={{
              __html: user_avatar,
            }}
            $size={"40px"}
            $border="2px solid #fff"
          />
          <StyledAvatar
            dangerouslySetInnerHTML={{
              __html: gaming_user_avatar,
            }}
            $size={"40px"}
            $border={`2px solid #fff`}
          />
        </StyledAvatarGroup>
      </StyledHeader>
      <StyledChatMainContainer>
        <StyledMessageContainer>
          <StyledMessage>
            <StyledMessageHeader>
              <StyledInstructAvatar>
                <StyledImage
                  alt="girl"
                  width={35}
                  height={35}
                  src="/memory-game/live-stream-chat/girl.png"
                />
              </StyledInstructAvatar>
              <StyledUserName>Mind Mistress</StyledUserName>
            </StyledMessageHeader>
            <StyledMessageText>
              🌟 Welcome to CogniMatch Central! 🚀🎉 Get ready to boost your
              memory skills and have a blast with fellow gamers! Chat,
              strategize, and aim for victory! 🧠💬 Let the CogniMatch fun
              begin! 🌈🎮
            </StyledMessageText>
          </StyledMessage>
          {_live_stream_chat_list.map((chat) => {
            return <Message {...chat} />;
          })}
        </StyledMessageContainer>
        <StyledInputContainer>
          <StyledInput
            ref={input_ref}
            type="text"
            placeholder="Write Here..."
            onKeyDown={(event) => {
              if (
                input_ref.current?.value &&
                (event.metaKey || event.ctrlKey) &&
                event.key == "Enter"
              ) {
                dispatch(
                  liveStreamChatApi({ message: input_ref.current.value })
                );
                input_ref.current.value = "";
              }
            }}
          />
          <StyledSentCta
            onClick={() => {
              if (input_ref.current) {
                dispatch(
                  liveStreamChatApi({ message: input_ref.current.value })
                );
                input_ref.current.value = "";
              }
            }}
          >
            <SendIcon color={theme.palette.primary.light} size={30} />
          </StyledSentCta>
        </StyledInputContainer>
      </StyledChatMainContainer>
    </StyledContainer>
  );
};

export default LiveStreamChat;
