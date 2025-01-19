// types
import type { FC } from "react";

// local components
import PokerTimer from "@/components/poker/poker-timer/poker-timer";

// styled components
import {
  StyledWaitingBannerWrapper,
  StyledWaitingBannerContent,
  StyledInfoText,
} from "@/styles/components/poker/poker-waiting-banner/poker-waiting-banner.style";

const PokerWaitingBanner: FC<{
  initial_count: number;
  updateShowWaitigBanner: (val: boolean) => void;
}> = ({ initial_count, updateShowWaitigBanner }) => {
  return (
    <StyledWaitingBannerWrapper>
      <StyledWaitingBannerContent>
        <PokerTimer
          initial_count={initial_count}
          handleOnFinish={() => {
            updateShowWaitigBanner(false);
          }}
        />
        <StyledInfoText>
          Waiting for other <br />
          players to join...
        </StyledInfoText>
      </StyledWaitingBannerContent>
    </StyledWaitingBannerWrapper>
  );
};
export default PokerWaitingBanner;
