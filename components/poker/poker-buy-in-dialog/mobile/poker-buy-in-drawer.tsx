import { useState } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPokerDrawerWrapper,
  StyledLogoText,
  StyledBuyInAmount,
  StyledBuyInSlider,
  StyledBlindsContainer,
  StyledBlindsHeader,
  StyledBlindsAmountWrapper,
  StyledChipsImage,
  StyledBlindsAmount,
  StyledBuyInCta,
} from "@/styles/components/poker/poker-buy-in-dialog/mobile/poker-buy-in-drawer.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  smallBlind,
  getPokerRoomInfoApi,
  updateShowBuyInModal,
} from "@/store/slice/poker/poker.slice";

const PokerBuyInDrawer: FC = () => {
  const dispatch = useAppDispatch();
  const small_blind = useAppSelector(smallBlind);
  const [poker_buy_in_amount, set_poker_buy_in_amount] = useState<number>(200);
  return (
    <StyledPokerDrawerWrapper>
      <StyledLogoText>
        Texas Hold'em <br />
        showdown
      </StyledLogoText>
      <StyledBuyInAmount>$ {poker_buy_in_amount * 1000}</StyledBuyInAmount>

      <StyledBuyInSlider
        value={poker_buy_in_amount}
        min={small_blind * 2 * 20} // minimum buy_in_amount is 20 times the big blind
        max={small_blind * 2 * 50} // maximum buy_in_amount is 50 times the big blind
        step={small_blind * 2} // multiple of big blind
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
            $ {small_blind}k / $ {small_blind * 2}k
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
    </StyledPokerDrawerWrapper>
  );
};
export default PokerBuyInDrawer;
