import { useState, useRef, useEffect } from "react";
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
  showBuyInModal,
  smallBlind,
  updateShowBuyInModal,
  getPokerRoomInfoApi,
} from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";

const PokerBuyInDialog: FC = () => {
  const dispatch = useAppDispatch();
  const dialog_ref = useRef<HTMLDialogElement>(null);
  const [poker_buy_in_amount, set_poker_buy_in_amount] = useState<number>(200);
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const small_blind = useAppSelector(smallBlind);
  const gsap_context = useRef<gsap.Context>();

  useEffect(() => {
    gsap_context.current = gsap.context(() => {
      gsap.fromTo(
        dialog_ref.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "bounce",
          duration: 1,
        }
      );
    });
    return () => {
      gsap_context.current?.revert();
    };
  }, []);
  return (
    <>
      {show_buy_in_modal && <StyledBackdrop />}
      <StyledPokerBuyInDialog ref={dialog_ref}>
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
      </StyledPokerBuyInDialog>
    </>
  );
};
export default PokerBuyInDialog;
