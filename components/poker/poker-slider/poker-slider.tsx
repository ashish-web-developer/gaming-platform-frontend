import { useState, useRef, useEffect } from "react";
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
} from "@/store/slice/poker/poker.slice";

// hooks
import { useIsMounted } from "@/hooks/common.hook";

const PokerSlider: FC<{
  auth_player: IPokerPlayer;
  updateDisabled: (val: boolean) => void;
  updateShowPokerSlider: (val: boolean) => void;
}> = ({ auth_player, updateDisabled, updateShowPokerSlider }) => {
  const dispatch = useAppDispatch();
  const slider_container_ref = useRef<HTMLDivElement>(null);
  const slider_ref = useRef<HTMLDivElement>(null);
  const is_mounted = useIsMounted();
  const { current_betted_amount = 0 } = auth_player;
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted) as number;
  const min_amount_to_be_raised = useAppSelector(minAmountToBeRaised) as number;
  const [slider_val, setSliderVal] = useState(min_amount_to_be_raised);
  const { total_chips_left } = auth_player;

  function handleRemoveSlider() {
    updateShowPokerSlider(false);
    /**
     * because of poker slider transparency  player betted amount on the
     * left and right of bettor is visible and causing some style related
     * issue, therefore we are hiding and showing those amount
     */
    ["player-seat-3", "player-seat-4", "player-seat-5"].forEach(
      (element_id) => {
        let element = document.getElementById(element_id);
        if (element) {
          element.style.visibility = "visible";
        }
      }
    );
  }
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (slider_container_ref.current?.contains(event.target as Element))
        return;
      handleRemoveSlider();
    }
    is_mounted && document.addEventListener("click", handleClick);
    return () => {
      is_mounted && document.removeEventListener("click", handleClick);
    };
  }, [is_mounted]);

  return (
    <StyledSliderContainer ref={slider_container_ref}>
      <StyledSliderWrapper ref={slider_ref}>
        <StyledSlider
          min={
            min_amount_to_be_betted +
            min_amount_to_be_raised -
            (current_betted_amount as number)
          }
          max={total_chips_left}
          value={slider_val}
          step={5}
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
              current_betted_amount:
                (current_betted_amount as number) + slider_val,
            })
          );
          handleRemoveSlider();
          updateDisabled(true);
        }}
      >
        Confirm
      </StyledConfirmCta>
    </StyledSliderContainer>
  );
};
export default PokerSlider;
