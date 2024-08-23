import type { FC } from "react";
import React from "react";

const PokerVector: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="457"
      height="309"
      fill="none"
      viewBox="0 0 457 309"
    >
      <path
        fill="url(#pattern0_2_22)"
        stroke="#F5D547"
        strokeWidth="12"
        d="M85 303L8 6h440.5l-40 148.5-40 148.5H85z"
      ></path>
      <defs>
        <pattern
          id="pattern0_2_22"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00034 0 0 .0005 -.1 0)"
            xlinkHref="#image0_2_22"
          ></use>
        </pattern>
        <image
          id="image0_2_22"
          width="3500"
          height="1969"
          xlinkHref="/poker/background.jpg"
        ></image>
      </defs>
    </svg>
  );
};

export default PokerVector;
