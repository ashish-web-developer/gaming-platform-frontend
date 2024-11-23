import { forwardRef, useState } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { ITheme } from "@/theme/poker.theme";
import type { IUser } from "@/types/store/slice/login";

// styled components
import {
  StyledPokerActionCtaWrapper,
  StyledActionCta,
} from "@/styles/components/poker/poker-player-seat/mobile/mobile-poker-action-cta.style";

// theme
import { useTheme } from "styled-components";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import {
  activePokerPlayers,
  minAmountToBeBetted,
  smallBlind,
  triggerActionApi,
  updateShowPokerSlider,
} from "@/store/slice/poker/poker.slice";

const MobilePokerActionCta: ForwardRefRenderFunction<HTMLButtonElement> = (
  {},
  ref
) => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const [is_action_triggered, set_is_action_triggered] = useState(false);
  const { id: user_id } = useAppSelector(User) as IUser;
  const small_blind = useAppSelector(smallBlind);
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted);
  const is_call = (min_amount_to_be_betted as number) > small_blind * 2;
  const current_betted_amount =
    useAppSelector(activePokerPlayers).filter(
      (player) => player.player_id == user_id
    )[0].current_betted_amount ?? 0;

  return (
    !is_action_triggered && (
      <StyledPokerActionCtaWrapper>
        <StyledActionCta
          onClick={() => {
            dispatch(
              triggerActionApi({
                action_type: "fold",
                current_betted_amount: null,
              })
            );
            set_is_action_triggered(true);
          }}
          $color={theme.palette.warning.main}
        >
          Fold
        </StyledActionCta>
        {is_call ? (
          <StyledActionCta
            onClick={() => {
              dispatch(
                triggerActionApi({
                  action_type: "call",
                  current_betted_amount: min_amount_to_be_betted as number,
                })
              );
              set_is_action_triggered(true);
            }}
            $color={"#fff"}
          >
            Call $ $
            {(min_amount_to_be_betted as number) - current_betted_amount} K
          </StyledActionCta>
        ) : (
          <StyledActionCta
            onClick={() => {
              dispatch(
                triggerActionApi({
                  action_type: "check",
                  current_betted_amount: min_amount_to_be_betted as number,
                })
              );
              set_is_action_triggered(true);
            }}
            $color={"#fff"}
          >
            Check
          </StyledActionCta>
        )}

        <StyledActionCta
          ref={ref}
          onClick={() => {
            dispatch(updateShowPokerSlider(true));
          }}
          $color={theme.palette.success.main}
        >
          Raise
        </StyledActionCta>
      </StyledPokerActionCtaWrapper>
    )
  );
};
export default forwardRef(MobilePokerActionCta);
