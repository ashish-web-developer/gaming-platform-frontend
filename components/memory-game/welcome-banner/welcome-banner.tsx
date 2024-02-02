// types
import { type FC } from "react";
import { IUsersWithConversation } from "@/types/store/slice/chat";
import type { ITheme } from "@/theme/memory-game.theme";

// styled components
import {
  StyledBanner,
  StyledWelcomeBannerPatternContainer,
  StyledWelcomeBannerContent,
  StyledStarIconWrapper,
  StyledBannerCircle,
  StyledMainBannerHeader,
  StyledSpan,
  StyledBannerPara,
  StyledAvatarGroup,
  StyledAvatar,
  StyledImage,
  StyledBannerImage,
} from "@/styles/components/memory-game/welcome-banner/welcome-banner.style";

// theme
import { useTheme } from "styled-components";

// local components
import WelcomeBannerPattern from "@/components/memory-game/welcome-banner/welcome-banner-pattern";

// redux

import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import useAvatar, { useAvatarUrl } from "@/hooks/profile.hook";

const StarIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 19"
    >
      <path
        fill={color}
        d="M10 0l2.245 6.91h7.266l-5.878 4.27 2.245 6.91L10 13.82l-5.878 4.27 2.245-6.91L.49 6.91h7.266L10 0z"
      ></path>
    </svg>
  );
};

const WelcomeBanner: FC = () => {
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
    <>
      <StyledBanner>
        <StyledBannerCircle />
        <StyledWelcomeBannerPatternContainer>
          <WelcomeBannerPattern
            color={theme.palette.primary.contrast}
            stroke={theme.palette.primary.light}
          />
          <StyledWelcomeBannerContent>
            <StyledStarIconWrapper>
              <StarIcon size={20} color="#080F0F" />
              <StarIcon size={20} color="#FFFFFF" />
              <StarIcon size={20} color="#16C172" />
            </StyledStarIconWrapper>
            <StyledMainBannerHeader>
              Cogni
              <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
            </StyledMainBannerHeader>
            <StyledBannerPara>
              &ldquo;CogniMatch&rdquo; is a captivating memory game designed to
              boost your cognitive skills. Flip cards, match pairs, and enhance
              your memory in a fun and challenging way. Perfect for all ages!
            </StyledBannerPara>
            <StyledAvatarGroup>
              <StyledAvatar
                $size="40px"
                $border="3px solid #000"
                $online={true}
              >
                <StyledImage
                  alt="user-avatar"
                  src={user_avatar_url}
                  fill={true}
                  sizes="(max-width: 1400px) 10vw"
                />
              </StyledAvatar>
              <StyledAvatar
                $size="40px"
                $online={_is_gaming_user_in}
                $border="3px solid #000"
              >
                <StyledImage
                  alt="user-avatar"
                  src={gaming_user_avatar_url}
                  fill={true}
                  sizes="(max-width: 1400px) 10vw"
                />
              </StyledAvatar>
            </StyledAvatarGroup>
          </StyledWelcomeBannerContent>
        </StyledWelcomeBannerPatternContainer>
        <StyledBannerImage />
      </StyledBanner>
    </>
  );
};

export default WelcomeBanner;
