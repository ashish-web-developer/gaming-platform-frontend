// types
import type { FC } from "react";

// styled components
import {
  StyledWrapper,
  StyledHeader,
  StyledBackButton,
  StyledHeaderText,
} from "@/styles/components/chat/chat-profile/chat-profile.style";

const BackIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
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

const ChatProfile: FC = () => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledBackButton>
          <BackIcon size={22} color="#000" />
        </StyledBackButton>
        <StyledHeaderText>Gamer Profile</StyledHeaderText>
      </StyledHeader>
    </StyledWrapper>
  );
};
export default ChatProfile;
