import { useState, useRef, forwardRef, useEffect } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { ITheme } from "@/theme/poker.theme";

// styled components
import {
  StyledRangeSliderWrapper,
  StyledConfirmCta,
  StyledPolygonVectorWrapper,
} from "@/public/poker/poker-slider/mobile/mobile-poker-slider.style";

// theme
import { useTheme } from "styled-components";

// local components
import UpsideDownTriangle from "@/components/common/upside-down-triagnle";

// external components
import Slider from "react-rangeslider";

// external css
import "react-rangeslider/lib/index.css";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  minAmountToBeBetted,
  smallBlind,
  // updateShowPokerSlider,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

type IProps = {
  total_chips_count: number;
  toggle_action_cta: (show: boolean) => void;
};

const MobilePokerSlider: ForwardRefRenderFunction<HTMLButtonElement, IProps> = (
  { total_chips_count, toggle_action_cta },
  raise_cta_ref
) => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const small_blind = useAppSelector(smallBlind);
  const min_amount_to_be_betted = useAppSelector(minAmountToBeBetted);
  const [thumb_left_position, set_thumb_left_position] = useState(0);
  const [slider_val, set_slider_val] = useState(
    min_amount_to_be_betted as number
  );
  const [show_confirm_tooltip, set_show_confirm_tooltip] =
    useState<boolean>(false);
  const slider_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggle_action_cta(false);
    const handle_outside_click = (event: MouseEvent) => {
      if (
        raise_cta_ref &&
        typeof raise_cta_ref !== "function" &&
        !raise_cta_ref.current?.contains(event.target as Node) &&
        !slider_ref.current?.contains(event.target as Node)
      ) {
        // dispatch(updateShowPokerSlider(false));
        toggle_action_cta(true);
      }
    };
    document.addEventListener("click", handle_outside_click);
    return () => {
      document.removeEventListener("click", handle_outside_click);
    };
  }, []);
  return (
    <>
      <StyledRangeSliderWrapper>
        {show_confirm_tooltip && (
          <StyledConfirmCta
            onClick={() => {
              // dispatch(updateShowPokerSlider(false));
              toggle_action_cta(true);
              dispatch(
                triggerActionApi({
                  action_type: "raise",
                  current_betted_amount: slider_val,
                })
              );
            }}
            $left={thumb_left_position}
          >
            Confirm
            <StyledPolygonVectorWrapper>
              <UpsideDownTriangle
                size={20}
                color={theme.palette.primary.main}
                stroke={theme.palette.secondary.main}
              />
            </StyledPolygonVectorWrapper>
          </StyledConfirmCta>
        )}
        <div
          ref={slider_ref}
          onClick={() => {
            const slider_thumb_element = document.getElementsByClassName(
              "rangeslider__handle"
            )[0];
            const { left: thumb_left_position } =
              slider_thumb_element.getBoundingClientRect();

            if (slider_ref.current) {
              const { left: slider_left_position } =
                slider_ref.current.getBoundingClientRect();
              set_thumb_left_position(
                thumb_left_position - (slider_left_position - 47)
              );
            }
          }}
          className="slider custom-labels"
        >
          <Slider
            min={min_amount_to_be_betted as number}
            max={total_chips_count}
            value={slider_val}
            step={small_blind * 2}
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
              const { left: thumb_left_position } =
                slider_thumb_element.getBoundingClientRect();
              if (slider_ref.current) {
                const { left: slider_left_position } =
                  slider_ref.current.getBoundingClientRect();
                set_thumb_left_position(
                  thumb_left_position - (slider_left_position - 47)
                );
              }
            }}
            tooltip={false}
          />
        </div>
      </StyledRangeSliderWrapper>
    </>
  );
};

export default forwardRef(MobilePokerSlider);
