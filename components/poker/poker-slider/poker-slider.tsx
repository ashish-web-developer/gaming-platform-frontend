import { useState } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledSliderContainer,
  StyledSliderWrapper,
  StyledSlider,
  StyledConfirmCta,
} from "@/public/poker/poker-slider/poker-slider.style";

// To include the default styles
import "react-rangeslider/lib/index.css";

const PokerSlider: FC = () => {
  const [slider_val, setSliderVal] = useState(0);
  return (
    <StyledSliderContainer>
      <StyledSliderWrapper>
        <StyledSlider
          min={0}
          max={200}
          value={slider_val}
          onChange={(val) => {
            setSliderVal(val);
          }}
          format={(value) => `$ ${value} K`}
        />
      </StyledSliderWrapper>
      <StyledConfirmCta>Confirm</StyledConfirmCta>
    </StyledSliderContainer>
  );
};
export default PokerSlider;
