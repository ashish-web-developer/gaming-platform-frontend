// types
import type { FC } from "react";

const MoonIcon: FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 27 30"
    >
      <g filter="url(#filter0_d_850_360)">
        <path
          fill={color}
          d="M14.632 21.974a10.66 10.66 0 008.257-3.888c.293-.357-.027-.88-.48-.794-5.157.97-9.893-2.936-9.893-8.078 0-2.962 1.605-5.686 4.214-7.153a.49.49 0 00-.156-.912 10.85 10.85 0 00-1.942-.175c-5.868 0-10.63 4.697-10.63 10.5 0 5.796 4.755 10.5 10.63 10.5z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_850_360"
          width="27"
          height="29"
          x="0.002"
          y="0.974"
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
            result="effect1_dropShadow_850_360"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_850_360"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default MoonIcon;
