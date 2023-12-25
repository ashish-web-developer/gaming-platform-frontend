import Image from "next/image";
// types
import type { FC } from "react";

// styled components
import {
  StyledContainer,
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledLogoSpan,
  StyledCloseCta,
  StyledMessageContainer,
  StyledTopMessage,
  StyledBottomMessage,
  StyledUserName,
  StyledDrawerImageContainer,
  StyledPlayCta
} from "@/styles/components/chat/chat-game-invitation/memory-game-invitation-drawer.style";

// redux
import { useAppDispatch } from "@/hooks/redux";
import { updateShowMemoryGameSnackbar } from "@/store/slice/chat.slice";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M1.624 0L0 1.624 8.376 10 0 18.376 1.624 20 10 11.624 18.376 20 20 18.376 11.624 10 20 1.624 18.376 0 10 8.376 1.624 0z"
      ></path>
    </svg>
  );
};

const MemoryGameInvitationDrawer: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <StyledContainer>
      <StyledPlayCta>
        Play Now
      </StyledPlayCta>
      <StyledDrawerImageContainer>
        <Image
          alt="girl"
          fill={true}
          src="/chat/chat-game-invitation/girl-image.png"
        />
      </StyledDrawerImageContainer>
      <StyledHeaderContainer>
        <StyledLogoContainer>
          Cogni<StyledLogoSpan>Match</StyledLogoSpan>
        </StyledLogoContainer>
        <StyledCloseCta
          onClick={() => {
            dispatch(updateShowMemoryGameSnackbar(false));
          }}
        >
          <CloseIcon size={20} color="#E7E08B" />
        </StyledCloseCta>
      </StyledHeaderContainer>
      <StyledMessageContainer>
        <StyledTopMessage>
          Hi there, <StyledUserName>Ashish</StyledUserName>
        </StyledTopMessage>
        <StyledBottomMessage>Ready For Memory ShowDown?</StyledBottomMessage>
      </StyledMessageContainer>
    </StyledContainer>
  );
};

export default MemoryGameInvitationDrawer;
