// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainSpan,
  StyledMainText,
  StyledStarContainer,
  StyledContent,
  StyledAvatarGroup,
  StyledAvatar,
  StyledBadgeContent
} from "@/styles/components/memory-game/welcome-banner/mobile/mobile-welcome-banner.style";

// styled theme
import { useTheme } from "styled-components";

// mui
import { Badge } from "@mui/material";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";

// helpers hooks
import useAvatar from "@/hooks/profile";



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
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const user_avatar_src = `data:image/svg+xml;base64,${btoa(user_avatar)}`;
  const gaming_user_avatar_src = `data:image/svg+xml;base64,${btoa(
    gaming_user_avatar
  )}`;

  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  return (
    <StyledContainer>
      <StyledDottedContainer>
        <StyledWelcomeBannerContainer
        animate = {{
          rotate:-5,
          transition:{
            duration:0.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        }}
        >
          <StyledMainText $rotate={"90deg"} $bottom="20%" $left={"-20px"}>
            <StyledMainSpan
              $color={
                theme.palette.welcome_banner.mobile.container.logo_text
                  .cogni_text_color
              }
            >
              Cogni
            </StyledMainSpan>
            <StyledMainSpan
              $color={
                theme.palette.welcome_banner.mobile.container.logo_text
                  .match_text_color
              }
            >
              Match
            </StyledMainSpan>
          </StyledMainText>

          <StyledMainText $right={"10px"} $top={"5px"}>
            <StyledMainSpan
              $color={
                theme.palette.welcome_banner.mobile.container.logo_text
                  .cogni_text_color
              }
            >
              Cogni
            </StyledMainSpan>
            <StyledMainSpan
              $color={
                theme.palette.welcome_banner.mobile.container.logo_text
                  .match_text_color
              }
            >
              Match
            </StyledMainSpan>
          </StyledMainText>
          <StyledStarContainer>
            <StarIcon
              size={20}
              color={
                theme.palette.welcome_banner.mobile.container.stars
                  .stars_first_color
              }
            />
            <StarIcon
              size={20}
              color={
                theme.palette.welcome_banner.mobile.container.stars
                  .stars_second_color
              }
            />
            <StarIcon
              size={20}
              color={
                theme.palette.welcome_banner.mobile.container.stars
                  .stars_third_color
              }
            />
          </StyledStarContainer>

          <StyledAvatarGroup max={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <StyledBadgeContent
                  $backgroundColor={theme.palette.secondary.green}
                />
              }
            >
              <StyledAvatar alt="user" src={user_avatar_src} />
            </Badge>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <StyledBadgeContent
                  $backgroundColor={
                    _is_gaming_user_in
                      ? theme.palette.secondary.green
                      : theme.palette.secondary.red
                  }
                />
              }
            >
              <StyledAvatar alt="user" src={gaming_user_avatar_src} />
            </Badge>
          </StyledAvatarGroup>
          <StyledContent>
            &ldquo;CogniMatch&rdquo; is a captivating memory game designed to boost your
            cognitive skills. Flip cards, match pairs, and enhance your memory
            in a fun and challenging way. Perfect for all ages!
          </StyledContent>
        </StyledWelcomeBannerContainer>
      </StyledDottedContainer>
    </StyledContainer>
  );
};

export default MobileWelcomeBanner;
