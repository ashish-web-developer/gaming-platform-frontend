import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// styled components
import {
  StyledPokerActionCtaWrapper,
  StyledActionCta,
} from "@/styles/components/poker/poker-player-seat/mobile/mobile-poker-action-cta.style";

// theme
import { useTheme } from "styled-components";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  active_poker_players,
  min_amount_to_be_betted,
  small_blind,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

const MobilePokerActionCta: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const { id: user_id } = useAppSelector(user);
  const _small_blind = useAppSelector(small_blind);
  const _min_amount_to_be_betted = useAppSelector(min_amount_to_be_betted);
  const is_call = (_min_amount_to_be_betted as number) > _small_blind * 2;
  const current_betted_amount =
    useAppSelector(active_poker_players).filter(
      (player) => player.player_id == user_id
    )[0].current_betted_amount ?? 0;

  return (
    <StyledPokerActionCtaWrapper>
      <StyledActionCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type: "fold",
              current_betted_amount: null,
            })
          );
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
                current_betted_amount: _min_amount_to_be_betted as number,
              })
            );
          }}
          $color={"#fff"}
        >
          Call $ ${(_min_amount_to_be_betted as number) - current_betted_amount}{" "}
          K
        </StyledActionCta>
      ) : (
        <StyledActionCta
          onClick={() => {
            dispatch(
              triggerActionApi({
                action_type: "check",
                current_betted_amount: _min_amount_to_be_betted as number,
              })
            );
          }}
          $color={"#fff"}
        >
          Check
        </StyledActionCta>
      )}

      <StyledActionCta $color={theme.palette.success.main}>
        Raise
      </StyledActionCta>
    </StyledPokerActionCtaWrapper>
  );
};
export default MobilePokerActionCta;
