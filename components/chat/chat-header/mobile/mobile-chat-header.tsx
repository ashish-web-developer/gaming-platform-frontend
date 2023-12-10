import Image from "next/image";
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

// redux
import { useAppSelector } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";

const MobileChatHeader: FC = () => {
  const _mode = useAppSelector(mode);
  return (
    <StyledMobileHeaderContainer>
      <StyledMobileHeader>
        <StyledMobileChatSearchIcon>
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
  );
};
export default MobileChatHeader;
