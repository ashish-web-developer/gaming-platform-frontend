import Image from "next/image";
import { createPortal } from "react-dom";
import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledMobileHeaderContainer,
  StyledMobileHeader,
  StyledHamBurgerIcon,
  StyledMobileChatSearchIcon,
  StyledWelcomingText,
  StyledWelcomingSpan,
} from "@/styles/components/chat/chat-header/mobile/mobile-chat-header.style";

// local components
import MobileChatSearchDialog from "@/components/chat/chat-dialog/mobile/mobile-chat-search-dialog";

// redux
import { useAppSelector } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useIsMounted } from "@/hooks/common.hook";

const MobileChatHeader: FC = () => {
  const _mode = useAppSelector(mode);
  const search_dialog_ref = useRef<HTMLDialogElement>(null);
  const is_mounted = useIsMounted();

  const handleModalClose = (event: MouseEvent) => {
    if (event.target == search_dialog_ref.current) {
      search_dialog_ref.current?.close();
      document.removeEventListener("click", handleModalClose);
    }
  };

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
