import { useState, useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledSliderWrapper,
  StyledRangeSliderInput,
  StyledRangeSliderValue,
} from "@/public/poker/poker-slider/poker-slider.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { small_blind } from "@/store/slice/poker/poker.slice";

const PokerSlider: FC<{
  total_chips_count: number;
}> = ({ total_chips_count }) => {
  const [slider_val, set_slider_val] = useState(0);
  const _small_blind = useAppSelector(small_blind);
  const slider_val_ref = useRef<HTMLSpanElement>(null);

  return (
    <StyledSliderWrapper>
      <StyledRangeSliderValue ref={slider_val_ref}>
        $ {slider_val}k
      </StyledRangeSliderValue>
      <StyledRangeSliderInput
        type="range"
        min={0}
        max={total_chips_count}
        step={_small_blind}
        value={slider_val}
        onInput={(event) => {
          const range_input_element = event.target as HTMLInputElement;
          const value = Number(range_input_element.value);
          set_slider_val(value);
          if (slider_val_ref.current) {
            const bubble_width = slider_val_ref.current.offsetWidth;
            console.log("value of bubble width", bubble_width);
            slider_val_ref.current.style.left = `${
              (value / total_chips_count) * range_input_element.offsetWidth -
              bubble_width / 2
            }px`;
          }
        }}
      />
    </StyledSliderWrapper>
  );
};
export default PokerSlider;
