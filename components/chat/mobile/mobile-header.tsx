// types
import type { FC } from "react";
// styled components
import {
  StyledContainer,
  StyledItem,
  StyledHeaderProfile,
  StyledAvatarName,
  StyledChevronLeftIcon,
  StyledDivider,
} from "@/styles/components/chat/mobile/mobile-header.style";

// local components
import ChatSearchbar from "@/components/chat/chat-searchbar";
import ChatAvatar from "@/components/chat/chat-avatar";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  active_user,
  show_chat,
  updateShowChat,
} from "@/store/slice/chat.slice";

// hooks
import { useTheme } from "styled-components";
import { IconButton } from "@mui/material";

const MobileHeader: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const _active_user = useAppSelector(active_user);
  const _show_chat = useAppSelector(show_chat);
  return (
    <>
      <StyledContainer>
        <StyledItem $flexBasis={"50px"}>
          <IconButton onClick={() => dispatch(updateShowChat(false))}>
            <StyledChevronLeftIcon />
          </IconButton>
        </StyledItem>
        <StyledItem $marginRight={"15px"} $flexGrow={1}>
          {_show_chat ? (
            <StyledHeaderProfile>
              <ChatAvatar
                width={60}
                height={60}
                username={_active_user?.username as string}
              />
              <div>
                <StyledAvatarName
                  $color={theme.palette.text.main}
                  $fontSize="14px"
                >
                  {_active_user?.name}
                </StyledAvatarName>
                <StyledAvatarName
                  $color={theme.palette.text.light}
                  $fontSize="12px"
                >
                  {_active_user?.username}
                </StyledAvatarName>
              </div>
            </StyledHeaderProfile>
          ) : (
            <ChatSearchbar />
          )}
        </StyledItem>
      </StyledContainer>
      <StyledDivider />
    </>
  );
};

export default MobileHeader;
