import { useRef, useEffect } from "react";
// tyeps
import type { FC } from "react";

// styled components
import {
  StyledStartBannerContainer,
  StyledStartBanner,
  StyledStartBannerContent,
  StyledMainText,
  StyledTextSpan,
  StyledVsContainer,
  StyledStartButton,
} from "@/styles/components/memory-game/start-banner/mobile/mobile-start-banner.style";

// local components
import MobileCountDown from "@/components/memory-game/start-banner/mobile/mobile-count-down";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";

const StartIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="25"
      fill="none"
      viewBox="0 0 22 25"
    >
      <path
        fill="#000"
        d="M20.723 10.482L3.535.32C2.14-.504 0 .296 0 2.337v20.318c0 1.83 1.987 2.934 3.535 2.016l17.188-10.156c1.533-.903 1.538-3.13 0-4.033z"
      ></path>
    </svg>
  );
};

const MobileStartBanner: FC = () => {
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
    <StyledStartBannerContainer>
      <StyledStartBanner>
        <StyledStartBannerContent>
          <StyledMainText>
            Cogni<StyledTextSpan $color="#F42C04">Match</StyledTextSpan> <br />
            Starting in <br />
            <StyledTextSpan $color="#16C172">
              <MobileCountDown /> sec
            </StyledTextSpan>
          </StyledMainText>
          <StyledVsContainer>
            {_user.name} <StyledTextSpan $color="#FF2400">V/s</StyledTextSpan>{" "}
            {_gaming_user?.name}
          </StyledVsContainer>
          <StyledStartButton>
            <StartIcon />
          </StyledStartButton>
        </StyledStartBannerContent>
      </StyledStartBanner>
    </StyledStartBannerContainer>
  );
};

export default MobileStartBanner;
