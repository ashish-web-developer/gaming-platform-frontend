import { useState } from "react";
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
  updateShowBuyInModal,
  getPokerRoomInfoApi,
} from "@/store/slice/poker/poker.slice";
import { user, updateEarnedPoints } from "@/store/slice/user.slice";

const PokerBuyInDialog: FC = () => {
  const dispatch = useAppDispatch();
  const [poker_buy_in_amount, set_poker_buy_in_amount] = useState<number>(200);
  const _user = useAppSelector(user);
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
        <StyledBuyInAmount>$ {poker_buy_in_amount * 1000}</StyledBuyInAmount>
        <StyledBuyInSlider
          value={poker_buy_in_amount}
          min={_small_blind * 2 * 20} // minimum buy_in_amount is 20 times the big blind
          max={_small_blind * 2 * 50} // maximum buy_in_amount is 50 times the big blind
          onInput={(event) => {
            const range_input_element = event.target as HTMLInputElement;
            set_poker_buy_in_amount(Number(range_input_element.value));
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
            dispatch(
              getPokerRoomInfoApi({
                poker_buy_in_amount,
              })
            );
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
