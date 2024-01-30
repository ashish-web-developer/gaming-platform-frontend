// types
import type { FC } from "react";

// styled components
import {
  StyledTimerBannerContainer,
  StyledTimerBanner,
  StyledTimerBannerContent,
  StyledMainText,
  StyledTextSpan,
  StyledVsContainer,
} from "@/styles/components/memory-game/timer-banner/mobile/mobile-timer-banner.style";

// hoc
import withCountDown from "@/hoc/memory-game/with-count-down";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";

const MobileTimerBanner: FC<{ count_down: number }> = ({ count_down }) => {
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  return (
    <StyledTimerBannerContainer>
      <StyledTimerBanner>
        <StyledTimerBannerContent>
          <StyledMainText>
            Cogni<StyledTextSpan $color="#F42C04">Match</StyledTextSpan> <br />
            Starting in <br />
            <StyledTextSpan $color="#16C172">{count_down} sec</StyledTextSpan>
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

export default withCountDown(MobileTimerBanner);
