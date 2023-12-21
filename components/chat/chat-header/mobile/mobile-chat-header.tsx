import Image from "next/image";
import { createPortal } from "react-dom";
import { useRef } from "react";
// types
import type { FC } from "react";
import type CustomChatTheme from "@/types/theme/chat";

// styled components
import {
  StyledMobileHeaderContainer,
  StyledMobileHeader,
  StyledHamBurgerIcon,
  StyledMobileChatSearchIcon,
  StyledWelcomingText,
  StyledWelcomingSpan,
  StyledBackCta,
  StyledChatUserProfile,
  StyledAvatar,
  StyledUserDetails,
  StyledUserName,
  StyledMessageCount,
} from "@/styles/components/chat/chat-header/mobile/mobile-chat-header.style";

// styled theme
import { useTheme } from "styled-components";

// local components
import MobileChatSearchDialog from "@/components/chat/chat-dialog/mobile/mobile-chat-search-dialog";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";
import {
  show_chat,
  active_user,
  active_user_conversation,
  updateShowChat,
} from "@/store/slice/chat.slice";

// hooks
import { useIsMounted } from "@/hooks/common.hook";
import useAvatar from "@/hooks/profile";

const BackIcon: FC<{ size: number, color:string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M12.576 19.895l-1.084 1.084a1.167 1.167 0 01-1.656 0L.344 11.492a1.167 1.167 0 010-1.656L9.836.344a1.167 1.167 0 011.656 0l1.084 1.084c.463.464.454 1.22-.02 1.675L6.672 8.709h14.034c.649 0 1.171.522 1.171 1.171v1.563c0 .65-.522 1.172-1.171 1.172H6.672l5.884 5.605c.479.454.488 1.211.02 1.675z"
      ></path>
    </svg>
  );
};

const MobileChatHeader: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as CustomChatTheme;
  const _mode = useAppSelector(mode);
  const _active_user = useAppSelector(active_user);
  const _show_chat = useAppSelector(show_chat);
  const search_dialog_ref = useRef<HTMLDialogElement>(null);
  const is_mounted = useIsMounted();
  const active_user_avatar = useAvatar(_active_user?.username as string);
  const _active_user_conversation = useAppSelector(active_user_conversation);

  const handleModalClose = (event: MouseEvent) => {
    if (event.target == search_dialog_ref.current) {
      search_dialog_ref.current?.close();
      document.removeEventListener("click", handleModalClose);
    }
  };
  if (_show_chat) {
    return (
      <StyledMobileHeaderContainer>
        <StyledMobileHeader>
          <StyledBackCta
            onClick={() => {
              dispatch(updateShowChat(false));
            }}
          >
            <BackIcon color = {theme.palette.back_button.icon} size={22} />
          </StyledBackCta>
          <StyledHamBurgerIcon />
        </StyledMobileHeader>
        <StyledChatUserProfile>
          <StyledAvatar
            dangerouslySetInnerHTML={{
              __html: active_user_avatar,
            }}
          ></StyledAvatar>
          <StyledUserDetails>
            <StyledUserName>{_active_user?.name}</StyledUserName>
            <StyledMessageCount>
              {_active_user_conversation.length} Messages
            </StyledMessageCount>
          </StyledUserDetails>
        </StyledChatUserProfile>
      </StyledMobileHeaderContainer>
    );
  }
  return (
    <>
      {is_mounted &&
        createPortal(
          <MobileChatSearchDialog ref={search_dialog_ref} />,
          document.getElementById("search-dialog-container") as HTMLElement
        )}
      <StyledMobileHeaderContainer>
        <StyledMobileHeader>
          <StyledMobileChatSearchIcon
            onClick={() => {
              search_dialog_ref.current?.showModal();
              document.addEventListener("click", handleModalClose);
            }}
          >
            <Image
              alt="search"
              src={
                "/chat/chat-header/mobile/" +
                (_mode == "light"
                  ? "light-search-icon.png"
                  : "dark-search-icon.png")
              }
              width={40}
              height={40}
            />
          </StyledMobileChatSearchIcon>
          <StyledHamBurgerIcon />
        </StyledMobileHeader>
        <StyledWelcomingText>
          Welcome Gaming,
          <br />
          <StyledWelcomingSpan>Buddy</StyledWelcomingSpan>
        </StyledWelcomingText>
      </StyledMobileHeaderContainer>
    </>
  );
};
export default MobileChatHeader;
