// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";

// theme
import { useTheme } from "styled-components";
// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const PlayButtonVector: FC = () => {
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const is_mobile = useIsMobile();
  if (is_mobile) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="61"
        height="55"
        fill="none"
        viewBox="0 0 61 55"
      >
        <g filter="url(#filter0_d_1167_430)">
          <path
            fill="#000"
            d="M14.036 2.42l-9.434 8.19v33.67H31.96l1.887 1.82h7.547l1.887-1.82h9.435l3.773-3.64V2.42h-4.717L49.886.6h-8.49l-1.888 1.82H14.036z"
          ></path>
          <path
            fill="#000"
            stroke="#A2F263"
            d="M16.01 4.058l-8.576 7.371v30.303h24.872l1.715 1.638h6.861l1.716-1.638h8.576l3.431-3.276V4.058h-4.288L48.6 2.42h-7.718l-1.716 1.638H16.01z"
          ></path>
          <path
            fill="#fff"
            d="M43.023 21.058l-16.215-9.246c-1.318-.751-3.335-.022-3.335 1.835v18.489c0 1.666 1.875 2.67 3.335 1.835l16.215-9.242a2.093 2.093 0 000-3.67z"
          ></path>
        </g>
        <defs>
          <filter
            id="filter0_d_1167_430"
            width="59.887"
            height="53.5"
            x="0.602"
            y="0.6"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1167_430"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_1167_430"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="43"
      fill="none"
      viewBox="0 0 48 43"
    >
      <g filter="url(#filter0_d_1141_5735)">
        <path
          fill="#000"
          d="M11.257 1.4L4 7.7v25.9h21.046l1.451 1.4h5.806l1.451-1.4h7.258l2.902-2.8V1.4h-3.628L38.834 0h-6.531l-1.451 1.4H11.257z"
        ></path>
        <path
          fill="#000"
          stroke={
            _mode == "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light
          }
          d="M12.777 2.66L6.18 8.33v23.31h19.132l1.32 1.26h5.278l1.32-1.26h6.597l2.639-2.52V2.66h-3.3L37.848 1.4H31.91l-1.32 1.26H12.777z"
        ></path>
        <path
          fill="#fff"
          d="M33.554 15.737L21.081 8.624c-1.013-.577-2.565-.017-2.565 1.412v14.222c0 1.282 1.442 2.055 2.565 1.412l12.473-7.11a1.61 1.61 0 000-2.823z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1141_5735"
          width="47.914"
          height="43"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1141_5735"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1141_5735"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default PlayButtonVector;
