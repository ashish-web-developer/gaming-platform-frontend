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

const MobileTimerBanner: FC<{ count_down: number }> = ({ count_down }) => {
  const _user = useAppSelector(user);
  return (
    <StyledTimerBannerContainer>
      <StyledTimerBanner>
        <StyledTimerBannerContent>
          <StyledMainText>
            Cogni<StyledTextSpan $color="#F42C04">Match</StyledTextSpan> <br />
            Starting in <br />
            <StyledTextSpan $color="#16C172">{count_down} sec</StyledTextSpan>
          </StyledMainText>
          
        </StyledTimerBannerContent>
      </StyledTimerBanner>
    </StyledTimerBannerContainer>
  );
};

export default withCountDown(MobileTimerBanner);
