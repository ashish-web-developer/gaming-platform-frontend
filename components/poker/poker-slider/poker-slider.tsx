// types
import type { FC } from "react";

// styled components
import {
  StyledSliderWrapper,
  StyledSlider,
  StyledTick,
} from "@/public/poker/poker-slider/poker-slider.style";

const PokerSlider: FC<{
  step_count: number;
}> = ({ step_count }) => {
  return (
    <StyledSliderWrapper>
      <StyledSlider>
        {new Array(step_count).fill(0).map((_, index) => {
          return (
            <StyledTick
              $is_active={index == 1 ? true : false}
              key={`tick-${index}`}
            />
          );
        })}
      </StyledSlider>
    </StyledSliderWrapper>
  );
};
export default PokerSlider;
