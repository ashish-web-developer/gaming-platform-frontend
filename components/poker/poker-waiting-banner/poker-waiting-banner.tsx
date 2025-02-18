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

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import {
  createDeckApi,
  dealerId,
  dealHandApi,
} from "@/store/slice/poker/poker.slice";

const PokerWaitingBanner: FC<{
  initial_count: number;
  updateShowWaitigBanner: (val: boolean) => void;
}> = ({ initial_count, updateShowWaitigBanner }) => {
  const dispatch = useAppDispatch();
  const { id: user_id } = useAppSelector(User) ?? {};
  const dealer_id = useAppSelector(dealerId);
  return (
    <StyledWaitingBannerWrapper>
      <StyledWaitingBannerContent>
        <PokerTimer
          initial_count={initial_count}
          handleOnFinish={() => {
            updateShowWaitigBanner(false);
            user_id == dealer_id &&
              dispatch(createDeckApi()).then(() => {
                dispatch(dealHandApi());
              });
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
