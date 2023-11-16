import { useRef, useEffect } from "react";
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
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { updateShowGameBoard } from "@/store/slice/memory-game.slice";

const StartBanner: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(
    `(max-width:${theme.palette.breakpoints.mobile})`
  );
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const count_down_sound_ref = useRef<{
    count_down_audio: HTMLAudioElement | null;
  }>({
    count_down_audio: null,
  });

  useEffect(() => {
    count_down_sound_ref.current.count_down_audio = new Audio(
      "/memory-game/start-banner/audio/count-down.mp3"
    );
  }, []);
  return (
    <StyledContainer>
      <StyledBannerBackgroundOne />
      <StyledBannerBackgroundTwo />
      <StyledImageContainer>
        <StyledImage
          alt="girl"
          src={theme.palette.start_banner.start_banner_girl_src}
          fill={true}
          sizes="(max-width: 1400px) 20vw"
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
        <StyledPlayButton
          onClick={() => {
            dispatch(updateShowGameBoard(true));
          }}
        >
          <Play size={isMobile ? 40 : 68} />
        </StyledPlayButton>
        <CountDown ref={count_down_sound_ref} />
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default StartBanner;
