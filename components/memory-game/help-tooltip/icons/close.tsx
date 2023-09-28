// types
import type { FC } from "react";

const CloseIcon: FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 33 33"
    >
      <g filter="url(#filter0_d_325_89)">
        <path
          fill="#2B061E"
          d="M26.656 0H6.344C5.05 0 4 1.2 4 2.679V22.32C4 23.801 5.05 25 6.344 25h20.312C27.95 25 29 23.8 29 22.321V2.68C29 1.199 27.95 0 26.656 0zm-4.082 16.21a.758.758 0 010 .972l-1.977 2.26a.55.55 0 01-.85 0L16.5 15.697l-3.247 3.745a.55.55 0 01-.85 0l-1.977-2.26a.758.758 0 010-.971l3.276-3.711-3.276-3.71a.758.758 0 010-.972l1.977-2.26a.55.55 0 01.85 0L16.5 9.302l3.247-3.744a.55.55 0 01.85 0l1.977 2.26a.758.758 0 010 .971L19.298 12.5l3.276 3.71z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_325_89"
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
            result="effect1_dropShadow_325_89"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_325_89"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default CloseIcon;
