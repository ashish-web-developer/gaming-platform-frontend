// types
import type { FC } from "react";
import { useState, useEffect, useRef } from "react";

// styled components
import {
  StyledRangeSliderWrapper,
  StyledConfirmCta,
} from "@/public/poker/poker-slider/mobile/mobile-poker-slider.style";

// external components
import Slider from "react-rangeslider";

// external css
import "react-rangeslider/lib/index.css";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  min_amount_to_be_betted,
  small_blind,
  updateShowPokerSlider,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

type IProps = {
  total_chips_count: number;
};

const MobilePokerSlider: FC<IProps> = ({ total_chips_count }) => {
  const dispatch = useAppDispatch();
  const _small_blind = useAppSelector(small_blind);
  const _min_amount_to_be_betted = useAppSelector(min_amount_to_be_betted);
  const thumb_right_position = useRef<number>(0);
  const [slider_val, set_slider_val] = useState(
    _min_amount_to_be_betted as number
  );
  const [show_confirm_tooltip, set_show_confirm_tooltip] =
    useState<boolean>(false);

  return (
    <>
      <StyledRangeSliderWrapper>
        {show_confirm_tooltip && (
          <StyledConfirmCta
            onClick={() => {
              dispatch(updateShowPokerSlider(false));
              dispatch(
                triggerActionApi({
                  action_type: "raise",
                  current_betted_amount: slider_val,
                })
              );
            }}
            $left={thumb_right_position.current}
          >
            Confirm
          </StyledConfirmCta>
        )}
        <div className="slider custom-labels">
          <Slider
            min={_min_amount_to_be_betted as number}
            max={total_chips_count}
            value={slider_val}
            step={_small_blind * 2}
            handleLabel={`${slider_val}`}
            onChangeStart={() => {
              set_show_confirm_tooltip(false);
            }}
            onChangeComplete={() => {
              set_show_confirm_tooltip(true);
            }}
            onChange={(value) => {
              set_slider_val(value);
              const slider_thumb_element = document.getElementsByClassName(
                "rangeslider__handle"
              )[0];
              const { left } = slider_thumb_element.getBoundingClientRect();
              thumb_right_position.current = left;
            }}
            tooltip={false}
          />
        </div>
      </StyledRangeSliderWrapper>
    </>
  );
};

export default MobilePokerSlider;
