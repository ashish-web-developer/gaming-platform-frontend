import React from "react";

function Background() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="388"
      height="162"
      fill="none"
      viewBox="0 0 388 162"
    >
      <g filter="url(#filter0_d_24_12)">
        <path
          fill="url(#paint0_linear_24_12)"
          d="M373 154H15c-6.075 0-11-4.925-11-11V11.323C4 4.755 9.718-.349 16.244.393l171.047 19.47c.804.09 1.615.093 2.419.007L371.825.308C378.328-.391 384 4.705 384 11.245V143c0 6.075-4.925 11-11 11z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_24_12"
          width="388"
          height="161.756"
          x="0"
          y="0.244"
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
            result="effect1_dropShadow_24_12"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_24_12"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_24_12"
          x1="19"
          x2="384"
          y1="5.5"
          y2="167.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0700B8"></stop>
          <stop offset="1" stopColor="#0F8"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Background;