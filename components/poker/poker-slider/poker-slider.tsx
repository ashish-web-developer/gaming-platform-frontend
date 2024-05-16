import { useRef, useState, useEffect, Fragment } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPokerSliderWrapper,
  StyledSliderTrack,
  StyledSliderThumb,
  StyledSliderThumbContent,
  StyledSliderTick,
  StyledSliderTickWithValue,
  StyledPokerSlider,
} from "@/public/poker/poker-slider/poker-slider.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { poker_chips } from "@/store/slice/poker/poker.slice";

const PokerSlider: FC = () => {
  const slider_ref = useRef<HTMLDivElement>(null);
  const slider_thumb_ref = useRef<HTMLDivElement>(null);
  const slider_track_ref = useRef<HTMLDivElement>(null);
  const slider_content_ref = useRef<HTMLSpanElement>(null);
  const [is_dragging, set_is_dragging] = useState<boolean>(false);
  const [start_y, set_start_y] = useState(0);

  // poker chips
  const _poker_chips = useAppSelector(poker_chips);

  useEffect(() => {
    const onMouseMoveHandler = (event: MouseEvent) => {
      if (is_dragging) {
        let y = event.pageY - start_y;
        if (
          slider_thumb_ref.current &&
          slider_track_ref.current &&
          slider_ref.current &&
          slider_content_ref.current &&
          y < slider_ref.current.clientHeight - 16 &&
          y > 0
        ) {
          slider_thumb_ref.current.style.top = `${y - 12}px`;
          slider_thumb_ref.current.style.bottom = "auto";
          slider_track_ref.current.style.height = `calc(100% - ${y}px)`;
        }
      }
    };
    const onMouseUpHandler = (event: MouseEvent) => {
      set_is_dragging(false);
    };
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [is_dragging]);
  return (
    <StyledPokerSliderWrapper>
      <StyledPokerSlider ref={slider_ref}>
        {[1, 2, 3, 4].map((val) => {
          const val_in_millions = (val * _poker_chips) / 4 / 1000;
          const text =
            val < 1 ? `${val_in_millions * 1000}K` : `${val_in_millions}M`;
          return (
            <Fragment key={`tick-${val}`}>
              <StyledSliderTickWithValue>{text}</StyledSliderTickWithValue>
              {val < 4 && (
                <>
                  <StyledSliderTick />
                  <StyledSliderTick />
                  <StyledSliderTick />
                </>
              )}
            </Fragment>
          );
        })}
        <StyledSliderTrack ref={slider_track_ref}></StyledSliderTrack>
        <StyledSliderThumb
          $content="0M"
          ref={slider_thumb_ref}
          onMouseDown={(event) => {
            event.stopPropagation();
            set_is_dragging(true);
            slider_thumb_ref.current &&
              set_start_y(event.pageY - slider_thumb_ref.current?.offsetTop);
          }}
        >
          <StyledSliderThumbContent ref={slider_content_ref}>
            2.4M
          </StyledSliderThumbContent>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="91"
            height="40"
            fill="none"
            viewBox="0 0 91 40"
          >
            <mask id="path-1-inside-1_178_150" fill="#fff">
              <path
                fillRule="evenodd"
                d="M60 .061A.061.061 0 0059.938 0H4a4 4 0 00-4 4v32a4 4 0 004 4h55.812a.188.188 0 00.188-.188c0-.067.036-.13.094-.163L88.3 23.364c2.667-1.54 2.667-5.388 0-6.928L60.03.115A.061.061 0 0160 .06z"
                clipRule="evenodd"
              ></path>
            </mask>
            <path
              fill="#000"
              fillRule="evenodd"
              d="M60 .061A.061.061 0 0059.938 0H4a4 4 0 00-4 4v32a4 4 0 004 4h55.812a.188.188 0 00.188-.188c0-.067.036-.13.094-.163L88.3 23.364c2.667-1.54 2.667-5.388 0-6.928L60.03.115A.061.061 0 0160 .06z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#F5D547"
              d="M60.03.115l2.5-4.33-2.5 4.33zM88.3 16.436l-2.5 4.33 2.5-4.33zM60.094 39.65l-2.5-4.33 2.5 4.33zM4 5h55.938V-5H4V5zm1 31V4H-5v32H5zm54.812-1H4v10h55.812V35zM85.8 19.034L57.594 35.32l5 8.66L90.8 27.695l-5-8.66zM57.53 4.444L85.8 20.767l5-8.66L62.53-4.215l-5 8.66zm5-8.66A4.939 4.939 0 0165 .062H55c0 1.809.965 3.48 2.53 4.384l5-8.66zm28.27 31.91c6-3.464 6-12.124 0-15.588l-5 8.66a1 1 0 010-1.732l5 8.66zM65 39.813c0 1.72-.917 3.308-2.406 4.167l-5-8.66A5.188 5.188 0 0055 39.812h10zM59.812 45A5.188 5.188 0 0065 39.812H55A4.812 4.812 0 0159.812 35v10zM-5 36a9 9 0 009 9V35a1 1 0 011 1H-5zM59.939 5A4.939 4.939 0 0155 .061h10A5.062 5.062 0 0059.938-5V5zM4-5a9 9 0 00-9 9H5a1 1 0 01-1 1V-5z"
              mask="url(#path-1-inside-1_178_150)"
            ></path>
          </svg>
        </StyledSliderThumb>
      </StyledPokerSlider>
    </StyledPokerSliderWrapper>
  );
};
export default PokerSlider;
