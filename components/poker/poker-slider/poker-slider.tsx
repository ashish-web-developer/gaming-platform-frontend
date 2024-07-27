import { useState, useRef, forwardRef, useEffect } from "react";
// types
import type { ForwardRefRenderFunction } from "react";

// styled components
import {
  StyledContainer,
  StyledRangeSliderWrapper,
  StyledRangeSlider,
  StyledSliderConfirmCta,
  StyledRangeSliderValue,
} from "@/public/poker/poker-slider/poker-slider.style";

// external components
import Slider from "react-rangeslider";

// external css
import "react-rangeslider/lib/index.css";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  small_blind,
  min_amount_to_be_betted,
  updateShowPokerSlider,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

const PokerSlider: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    total_chips_count: number;
    toggle_action_cta: (show: boolean) => void;
  }
> = ({ total_chips_count, toggle_action_cta }, raise_cta_ref) => {
  const dispatch = useAppDispatch();
  const _min_amount_to_be_betted = useAppSelector(min_amount_to_be_betted);
  const [slider_val, set_slider_val] = useState<number>(
    _min_amount_to_be_betted as number
  );
  const [thumb_left_position, set_thumb_left_position] = useState(0);
  const _small_blind = useAppSelector(small_blind);
  const slider_container_ref = useRef<HTMLDivElement>(null);
  const slider_wrapper_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggle_action_cta(false);
    const handle_outside_click = (event: MouseEvent) => {
      if (
        raise_cta_ref &&
        typeof raise_cta_ref !== "function" &&
        !raise_cta_ref.current?.contains(event.target as Node) &&
        !slider_container_ref.current?.contains(event.target as Node)
      ) {
        dispatch(updateShowPokerSlider(false));
        toggle_action_cta(true);
      }
    };
    document.addEventListener("click", handle_outside_click);
    return () => {
      document.removeEventListener("click", handle_outside_click);
    };
  }, []);

  return (
    <StyledContainer ref={slider_container_ref}>
      <StyledRangeSliderValue $left={thumb_left_position}>
        $ {slider_val}K
      </StyledRangeSliderValue>
      <StyledRangeSliderWrapper ref={slider_wrapper_ref}>
        <StyledRangeSlider>
          <div className="slider custom-labels">
            <Slider
              min={_min_amount_to_be_betted as number}
              max={total_chips_count}
              value={slider_val}
              step={_small_blind * 2}
              onChange={(value) => {
                set_slider_val(value);
                const slider_thumb_element = document.getElementsByClassName(
                  "rangeslider__handle"
                )[0];
                const { left: slider_left } =
                  slider_thumb_element.getBoundingClientRect();
                if (slider_wrapper_ref.current) {
                  const { left: slider_wrapper_left } =
                    slider_wrapper_ref.current?.getBoundingClientRect();
                  set_thumb_left_position(
                    slider_left - (slider_wrapper_left + 30)
                  );
                }
              }}
              tooltip={false}
            />
          </div>
        </StyledRangeSlider>
      </StyledRangeSliderWrapper>
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
    </StyledContainer>
  );
};
export default forwardRef(PokerSlider);
