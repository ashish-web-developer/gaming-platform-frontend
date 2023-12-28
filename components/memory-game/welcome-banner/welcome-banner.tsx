import { useState, useEffect } from "react";
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
  StyledBadgeContent,
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

// mui
import { Badge } from "@mui/material";

// hooks
import useAvatar from "@/hooks/profile.hook";

const WelcomeBanner: FC = () => {
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
            &ldquo;CogniMatch&rdquo; is a captivating memory game designed to boost your
            cognitive skills. Flip cards, match pairs, and enhance your memory
            in a fun and challenging way. Perfect for all ages!
          </StyledBannerPara>
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
        </StyledBannerContent>
        <StyledBannerImage></StyledBannerImage>
      </StyledBanner>
    </>
  );
};

export default WelcomeBanner;
