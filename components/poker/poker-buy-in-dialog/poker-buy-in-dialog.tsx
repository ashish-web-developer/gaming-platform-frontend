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
  StyledBlindsAmount,
  StyledBuyInCta,
} from "@/styles/components/poker/poker-buy-in-dialog/poker-buy-in-dialog.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_buy_in_modal,
  poker_buy_in_amount,
  updatePokerBuyInAmount,
} from "@/store/slice/poker/poker.slice";

const PokerBuyInDialog: FC = () => {
  const dispatch = useAppDispatch();
  const _poker_buy_in_amount = useAppSelector(poker_buy_in_amount);
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
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
          min="40"
          max="300"
          value={_poker_buy_in_amount}
          onInput={(event) => {
            const range_input_element = event.target as HTMLInputElement;
            dispatch(updatePokerBuyInAmount(Number(range_input_element.value)));
          }}
        />
        <StyledBlindsContainer>
          <StyledBlindsHeader>Blinds</StyledBlindsHeader>
          <StyledBlindsAmount>$ 50 / $ 100</StyledBlindsAmount>
        </StyledBlindsContainer>
        <StyledBuyInCta>Buy In</StyledBuyInCta>
      </StyledPokerBuyInDialog>
    </>
  );
};
export default PokerBuyInDialog;
