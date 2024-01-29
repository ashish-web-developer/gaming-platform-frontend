import { useRef, useEffect } from "react";
// tyeps
import type { FC } from "react";

// styled components
import {
  StyledTimerBannerContainer,
  StyledTimerBanner,
  StyledTimerBannerContent,
  StyledMainText,
  StyledTextSpan,
  StyledVsContainer,
  StyledTimerButton,
} from "@/styles/components/memory-game/timer-banner/mobile/mobile-timer-banner.style";

// local components
import MobileCountDown from "@/components/memory-game/timer-banner/mobile/mobile-count-down";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";


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
    <StyledTimerBannerContainer>
      <StyledTimerBanner>
        <StyledTimerBannerContent>
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
        </StyledTimerBannerContent>
      </StyledTimerBanner>
    </StyledTimerBannerContainer>
  );
};

export default MobileStartBanner;
