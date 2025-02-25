// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledActionCtaWrapper,
  StyledActionCta,
  StyledActionCtaIcons,
} from "@/styles/components/poker/poker-table/poker-action-cta.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  minAmountToBeBetted,
  triggerActionApi,
  updateShowPokerSlider,
} from "@/store/slice/poker/poker.slice";

const PokerActionCta: FC<{
  auth_player: IPokerPlayer;
}> = ({ auth_player }) => {
  const dispatch = useAppDispatch();
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted) as number;
  const { current_betted_amount = 0 } = auth_player;

  const action_type =
    (current_betted_amount as number) < min_amount_to_be_betted
      ? "call"
      : "check";
  return (
    <StyledActionCtaWrapper>
      <StyledActionCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type: "fold",
              current_betted_amount: null,
            })
          );
        }}
      >
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/fold.png"
          alt="fold-icon"
          width={20}
          height={20}
        />
        Fold
      </StyledActionCta>
      <StyledActionCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type,
              current_betted_amount:
                action_type == "call" ? min_amount_to_be_betted : null,
            })
          );
        }}
      >
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/check.png"
          alt="check-icon"
          width={20}
          height={20}
        />
        {action_type == "call"
          ? `Call ${
              min_amount_to_be_betted - (current_betted_amount as number)
            }K`
          : "Check"}
      </StyledActionCta>
      <StyledActionCta
        id="poker-raise-cta"
        onClick={() => {
          dispatch(updateShowPokerSlider(true));
        }}
      >
        <StyledActionCtaIcons
          src="/poker/poker-table/action-cta-icons/raise.png"
          alt="raise-icon"
          width={20}
          height={20}
        />
        Raise
      </StyledActionCta>
    </StyledActionCtaWrapper>
  );
};

export default PokerActionCta;
