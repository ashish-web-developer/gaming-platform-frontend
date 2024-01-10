// types
import { type FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledBanner,
  StyledBannerContent,
  StyledBannerCircle,
  StyledPopularTag,
  StyledPopularText,
  StyledMainBannerHeader,
  StyledBannerPara,
  StyledAvatarGroup,
  StyledAvatar,
  StyledBannerImage,
} from "@/styles/components/memory-game/welcome-banner/welcome-banner.style";

// theme
import { useTheme } from "styled-components";

// icons
import Fire from "@/components/memory-game/welcome-banner/icons/fire";

// redux

import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";

// hooks
import useAvatar from "@/hooks/profile.hook";

const WelcomeBanner: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);

  return (
    <>
      <StyledBanner>
        <StyledBannerCircle />
        <StyledBannerContent>
          <StyledPopularTag>
            <Fire />
            <StyledPopularText>Popular</StyledPopularText>
          </StyledPopularTag>
          <StyledMainBannerHeader>
            <span
              style={{
                color: theme.palette.welcome_banner.side_container.text,
              }}
            >
              Cogni
            </span>
            Match
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
              dangerouslySetInnerHTML={{
                __html: user_avatar,
              }}
            />
            <StyledAvatar
              $size="40px"
              $online={_is_gaming_user_in}
              $border="3px solid #000"
              dangerouslySetInnerHTML={{
                __html: gaming_user_avatar,
              }}
            />
          </StyledAvatarGroup>
        </StyledBannerContent>
        <StyledBannerImage></StyledBannerImage>
      </StyledBanner>
    </>
  );
};

export default WelcomeBanner;
