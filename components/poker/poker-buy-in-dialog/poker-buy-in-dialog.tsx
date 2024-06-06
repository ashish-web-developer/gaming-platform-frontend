// types
import type { FC } from "react";
// styled components
import {
  StyledBackdrop,
  StyledPokerBuyInDialog,
  StyledDialogImageWrapper,
  StyledDialogImage,
  StyledMainText,
  StyledBuyInAmount,
  StyledBuyInSlider,
  StyledBlindsContainer,
  StyledBlindsHeader,
  StyledBlindsAmountWrapper,
  StyledChipsImage,
  StyledBlindsAmount,
  StyledBuyInCta,
} from "@/styles/components/poker/poker-buy-in-dialog/poker-buy-in-dialog.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_buy_in_modal,
  small_blind,
  poker_buy_in_amount,
  updatePokerBuyInAmount,
  updateShowBuyInModal,
  updateBuyInAmountApi,
} from "@/store/slice/poker/poker.slice";
import { user, updateEarnedPoints } from "@/store/slice/user.slice";

const PokerBuyInDialog: FC = () => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _poker_buy_in_amount = useAppSelector(poker_buy_in_amount);
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
  const _small_blind = useAppSelector(small_blind);
  return (
    <>
      {_show_buy_in_modal && <StyledBackdrop />}
      <StyledPokerBuyInDialog open={_show_buy_in_modal}>
        <StyledDialogImageWrapper>
          <StyledDialogImage
            src={"/poker/poker-buy-in-dialog/michael.png"}
            alt="michael"
            fill={true}
          />
        </StyledDialogImageWrapper>
        <StyledMainText>
          Texas Hold’em <br /> Showdown
        </StyledMainText>
        <StyledBuyInAmount>$ {_poker_buy_in_amount * 1000}</StyledBuyInAmount>
        <StyledBuyInSlider
          min={_small_blind * 2 * 20} // minimum buy_in_amount is 20 times the big blind
          max={_small_blind * 2 * 50} // maximum buy_in_amount is 50 times the big blind
          value={_poker_buy_in_amount}
          onInput={(event) => {
            const range_input_element = event.target as HTMLInputElement;
            dispatch(updatePokerBuyInAmount(Number(range_input_element.value)));
          }}
        />
        <StyledBlindsContainer>
          <StyledBlindsHeader>Blinds</StyledBlindsHeader>
          <StyledBlindsAmountWrapper>
            <StyledChipsImage
              src="/poker/poker-player/poker-chip.png"
              alt="chip"
              width={20}
              height={20}
            />
            <StyledBlindsAmount>
              $ {_small_blind}k / $ {_small_blind * 2}k
            </StyledBlindsAmount>
          </StyledBlindsAmountWrapper>
        </StyledBlindsContainer>
        <StyledBuyInCta
          onClick={() => {
            dispatch(updateBuyInAmountApi());
            // if (_user.earned_points) {
            //   dispatch(
            //     updateEarnedPoints(
            //       _user.earned_points - _poker_buy_in_amount * 1000
            //     )
            //   );
            // }
            dispatch(updateShowBuyInModal(false));
          }}
        >
          Buy In
        </StyledBuyInCta>
      </StyledPokerBuyInDialog>
    </>
  );
};
export default PokerBuyInDialog;
