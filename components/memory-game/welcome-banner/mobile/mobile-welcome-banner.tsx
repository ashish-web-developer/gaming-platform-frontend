// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainText,
  StyledSpan,
  StyledStarContainer,
  StyledContent,
  StyledAvatarGroup,
  StyledAvatar,
  StyledImage,
} from "@/styles/components/memory-game/welcome-banner/mobile/mobile-welcome-banner.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// helpers hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const StarIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
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
        d="M8.962.752L11.8 7.44l7.238-.633-5.484 4.766 2.84 6.688-6.229-3.742-5.483 4.767 1.634-7.08L.09 8.466l7.238-.633L8.962.752z"
      ></path>
    </svg>
  );
};

const MobileWelcomeBanner: FC = () => {
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const gaming_user_avatar_url = useAvatarUrl(
    _gaming_user as IUsersWithConversation
  );
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  return (
    <StyledContainer>
      <StyledDottedContainer $mode={_mode}>
        <StyledWelcomeBannerContainer
          animate={{
            rotate: -5,
            transition: {
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
        >
          <StyledMainText $rotate={"90deg"} $bottom="20%" $left={"-20px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>
          <StyledMainText $right={"10px"} $top={"5px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>

          <StyledStarContainer>
            <StarIcon size={20} color={"#080F0F"} />
            <StarIcon size={20} color={"#FFFFFF"} />
            <StarIcon size={20} color={"#16C172"} />
          </StyledStarContainer>

          <StyledAvatarGroup>
            <StyledAvatar
              $size="40px"
              $border={theme.palette.primary.light}
              $online={true}
            >
              <StyledImage
                fill={true}
                alt="user-avatar"
                src={user_avatar_url}
                sizes="(max-width: 1400px) 10vw"
              />
            </StyledAvatar>
            <StyledAvatar
              $size="40px"
              $border={theme.palette.primary.light}
              $online={_is_gaming_user_in}
            >
              <StyledImage
                fill={true}
                alt="user-avatar"
                src={gaming_user_avatar_url}
                sizes="(max-width: 1400px) 10vw"
              />
            </StyledAvatar>
          </StyledAvatarGroup>
          <StyledContent>
            &ldquo;CogniMatch&rdquo; is a captivating memory game designed to
            boost your cognitive skills. Flip cards, match pairs, and enhance
            your memory in a fun and challenging way. Perfect for all ages!
          </StyledContent>
        </StyledWelcomeBannerContainer>
      </StyledDottedContainer>
    </StyledContainer>
  );
};

export default MobileWelcomeBanner;
