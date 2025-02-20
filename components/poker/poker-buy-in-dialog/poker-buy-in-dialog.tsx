import { useState, useRef } from "react";
// types
import type { FC } from "react";
// styled components
import {
  StyledBackdrop,
  StyledPokerBuyInDialog,
  StyledDialogImageWrapper,
  StyledDialogImage,
  StyledLogo,
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
import { useGSAP } from "@gsap/react";

const PokerBuyInDialog: FC<{
  onModalCloseHandler: () => void;
}> = ({ onModalCloseHandler }) => {
  const dispatch = useAppDispatch();
  const dialog_ref = useRef<HTMLDivElement>(null);
  const [poker_buy_in_amount, setPokerBuyInAmount] = useState<number>(200);
  const small_blind = useAppSelector(smallBlind);

  useGSAP(() => {
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

  return (
    <>
      <StyledBackdrop />
      <StyledPokerBuyInDialog ref={dialog_ref}>
        <StyledDialogImageWrapper>
          <StyledDialogImage
            src={"/poker/poker-buy-in-dialog/main-image.png"}
            alt="dialog-image"
            fill={true}
            sizes="(max-width: 1400px) 20vw"
          />
        </StyledDialogImageWrapper>
        <StyledLogo>
          Texas Hold’em <br /> Showdown
        </StyledLogo>
        <StyledBuyInAmount>$ {poker_buy_in_amount * 1000}</StyledBuyInAmount>
        <StyledBuyInSlider
          value={poker_buy_in_amount}
          min={small_blind * 2 * 20} // minimum buy_in_amount is 20 times the big blind
          max={small_blind * 2 * 50} // maximum buy_in_amount is 50 times the big blind
          step={small_blind * 2} // multiple of big blind
          onInput={(event) => {
            const range_input_element = event.target as HTMLInputElement;
            setPokerBuyInAmount(Number(range_input_element.value));
          }}
        />
        <StyledBlindsContainer>
          <StyledBlindsHeader>Blinds</StyledBlindsHeader>
          <StyledBlindsAmountWrapper>
            <StyledChipsImage
              src="/poker/poker-player/poker-chips.png"
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
            const response = dispatch(
              getPokerRoomInfoApi({
                poker_buy_in_amount,
              })
            );
            dispatch(updateShowBuyInModal(false));
            onModalCloseHandler();
          }}
        >
          Buy In
        </StyledBuyInCta>
      </StyledPokerBuyInDialog>
    </>
  );
};
export default PokerBuyInDialog;
