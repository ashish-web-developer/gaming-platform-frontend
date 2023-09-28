// types
import type { FC } from "react";

const HelpIcon: FC<{ width: number; height: number }> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 68 68"
    >
      <g filter="url(#filter0_d_324_6)">
        <path
          fill="#D62839"
          d="M64 30c0 16.572-13.433 30-30 30S4 46.572 4 30C4 13.437 17.433 0 34 0s30 13.438 30 30zM34.805 9.92c-6.592 0-10.797 2.776-14.099 7.712a1.454 1.454 0 00.329 1.967l4.197 3.182c.63.478 1.527.364 2.016-.256 2.161-2.741 3.643-4.33 6.932-4.33 2.471 0 5.528 1.59 5.528 3.986 0 1.812-1.495 2.742-3.936 4.11-2.845 1.596-6.61 3.58-6.61 8.548v.484c0 .801.65 1.451 1.45 1.451h6.775c.802 0 1.452-.65 1.452-1.451v-.162c0-3.443 10.063-3.586 10.063-12.903 0-7.016-7.279-12.339-14.097-12.339zm-.805 30a5.57 5.57 0 00-5.564 5.564A5.57 5.57 0 0034 51.048a5.57 5.57 0 005.565-5.564A5.57 5.57 0 0034 39.919z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_324_6"
          width="68"
          height="68"
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
            result="effect1_dropShadow_324_6"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_324_6"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default HelpIcon;
