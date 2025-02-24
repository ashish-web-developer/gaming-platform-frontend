import { useState, useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledSliderContainer,
  StyledSliderWrapper,
  StyledSlider,
  StyledConfirmCta,
} from "@/public/poker/poker-slider/poker-slider.style";

// To include the default styles
import "react-rangeslider/lib/index.css";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  minAmountToBeRaised,
  minAmountToBeBetted,
  triggerActionApi,
  updateShowPokerSlider,
} from "@/store/slice/poker/poker.slice";

const PokerSlider: FC<{
  auth_player: IPokerPlayer;
}> = ({ auth_player }) => {
  const dispatch = useAppDispatch();
  const slider_ref = useRef<HTMLDivElement>(null);
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted) as number;
  const min_amount_to_be_raised = useAppSelector(minAmountToBeRaised) as number;
  const [slider_val, setSliderVal] = useState(min_amount_to_be_raised);
  const { total_chips_left } = auth_player;

  return (
    <StyledSliderContainer>
      <StyledSliderWrapper ref={slider_ref}>
        <StyledSlider
          min={min_amount_to_be_betted + min_amount_to_be_raised}
          max={total_chips_left}
          value={slider_val}
          onChange={(val) => {
            setSliderVal(val);
          }}
          format={(value) => `$ ${value} K`}
        />
      </StyledSliderWrapper>
      <StyledConfirmCta
        onClick={() => {
          dispatch(
            triggerActionApi({
              action_type: "raise",
              current_betted_amount: slider_val,
            })
          );
          dispatch(updateShowPokerSlider(false));
        }}
      >
        Confirm
      </StyledConfirmCta>
    </StyledSliderContainer>
  );
};
export default PokerSlider;
