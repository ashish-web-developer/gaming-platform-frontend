import { useState, useRef, useEffect, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";

// styled components
import {
  StyledSliderWrapper,
  StyledSliderContainer,
  StyledSliderConfirmCta,
  StyledRangeSliderInput,
  StyledRangeSliderValue,
} from "@/public/poker/poker-slider/poker-slider.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  small_blind,
  min_amount_to_be_betted,
  updateShowPokerSlider,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

// hooks
import { useIsMounted } from "@/hooks/common.hook";

const PokerSlider: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    total_chips_count: number;
    toggle_action_cta: (show: boolean) => void;
  }
> = ({ total_chips_count, toggle_action_cta }, raise_cta_ref) => {
  const dispatch = useAppDispatch();
  const is_mounted = useIsMounted();
  const _min_amount_to_be_betted = useAppSelector(min_amount_to_be_betted);
  const [slider_val, set_slider_val] = useState<number>(0);
  const _small_blind = useAppSelector(small_blind);
  const slider_wrapper_ref = useRef<HTMLDivElement>(null);
  const slider_val_ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    set_slider_val(_min_amount_to_be_betted as number);
  }, [_min_amount_to_be_betted]);
  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        raise_cta_ref &&
        typeof raise_cta_ref !== "function" &&
        !raise_cta_ref.current?.contains(event.target as Node) &&
        !slider_wrapper_ref.current?.contains(event.target as Node)
      ) {
        dispatch(updateShowPokerSlider(false));
        toggle_action_cta(true);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  useEffect(() => {
    toggle_action_cta(false);
  }, [is_mounted]);
  return (
    <StyledSliderWrapper ref={slider_wrapper_ref}>
      <StyledSliderContainer>
        <StyledRangeSliderValue ref={slider_val_ref}>
          $ {slider_val}k
        </StyledRangeSliderValue>
        <StyledRangeSliderInput
          type="range"
          min={_min_amount_to_be_betted as number}
          max={total_chips_count}
          step={_small_blind * 2}
          value={slider_val}
          onInput={(event) => {
            const range_input_element = event.target as HTMLInputElement;
            const value = Number(range_input_element.value);
            set_slider_val(value);
            if (slider_val_ref.current && _min_amount_to_be_betted) {
              const bubble_width = slider_val_ref.current.offsetWidth;
              slider_val_ref.current.style.left = `${
                (value / total_chips_count) * range_input_element.offsetWidth -
                bubble_width / 2
              }px`;
            }
          }}
        />
      </StyledSliderContainer>
      <StyledSliderConfirmCta
        onClick={() => {
          dispatch(updateShowPokerSlider(false));
          toggle_action_cta(true);
          dispatch(
            triggerActionApi({
              action_type: "raise",
              current_betted_amount: slider_val,
            })
          );
        }}
      >
        Confirm
      </StyledSliderConfirmCta>
    </StyledSliderWrapper>
  );
};
export default forwardRef(PokerSlider);
