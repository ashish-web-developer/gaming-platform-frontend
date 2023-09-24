// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledContainer,
  StyledBannerBackgroundOne,
  StyledBannerBackgroundTwo,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledContentTop,
  StyledLogo,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledPlayButton,
} from "@/styles/components/memory-game/start-banner/start-banner.style";

// local components
import CountDown from "@/components/memory-game/start-banner/count-down";

// mui
import { useMediaQuery } from "@mui/material";

// icons
import Play from "@/components/memory-game/start-banner/icons/play";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";

const StartBanner: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const isMobile = useMediaQuery(
    `(max-width:${theme.palette.breakpoints.mobile})`
  );
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  console.log("isMobile", isMobile);
  return (
    <StyledContainer>
      <StyledBannerBackgroundOne />
      <StyledBannerBackgroundTwo />
      <StyledImageContainer>
        <StyledImage
          layout="responsive"
          width={200}
          height={150}
          alt="girl"
          src="/memory-game/start-banner/start-banner-girl.png"
        />
      </StyledImageContainer>
      <StyledContentContainer>
        <StyledContentTop>
          <StyledLogo>
            Cogni
            <span
              style={{
                color: "#080f0f",
              }}
            >
              Match
            </span>
          </StyledLogo>
          <StyledVersusContainer>
            <StyledVersusText>
              {_user.name?.split(" ")[0]}{" "}
              <span style={{ color: theme.palette.secondary.red }}>v/s</span>{" "}
              {_gaming_user?.name?.split(" ")[0]}
            </StyledVersusText>
            <StyledVersusImage
              width={40}
              height={40}
              alt="chips"
              src="/memory-game/start-banner/versus-container/chips.png"
            />
          </StyledVersusContainer>
        </StyledContentTop>
        <StyledPlayButton>
          <Play size={isMobile ? 40 : 68} />
        </StyledPlayButton>
        <CountDown />
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default StartBanner;
