// types
import type { FC } from "react";

const NextIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 33 33"
    >
      <g filter="url(#filter0_d_325_94)">
        <path
          fill={color}
          d="M6.679 0H26.32C27.801 0 29 1.2 29 2.679V22.32C29 23.801 27.8 25 26.321 25H6.68C5.199 25 4 23.8 4 22.321V2.68C4 1.199 5.2 0 6.679 0zm7.84 19.839l6.865-6.865a.67.67 0 000-.947L14.518 5.16a.67.67 0 00-1.143.473v13.732a.67.67 0 001.143.473z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_325_94"
          width="33"
          height="33"
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
            result="effect1_dropShadow_325_94"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_325_94"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default NextIcon;
