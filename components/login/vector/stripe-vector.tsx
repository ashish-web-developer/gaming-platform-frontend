import React from "react";
// type
import type { FC } from "react";

const StripeVector: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="231"
      height="230"
      fill="none"
      viewBox="0 0 231 230"
    >
      <path fill="#F5D547" d="M102 .5H2L230 228V128L102 .5z"></path>
      <path
        fill="url(#pattern0_73_79)"
        fillOpacity="0.3"
        d="M102 .5H2L230 228V128L102 .5z"
      ></path>
      <path stroke="#000" d="M102 .5H2L230 228V128L102 .5z"></path>
      <defs>
        <pattern
          id="pattern0_73_79"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00026 0 0 .00026 0 -.001)"
            xlinkHref="#image0_73_79"
          ></use>
        </pattern>
        <image
          id="image0_73_79"
          width="3901"
          height="3901"
          xlinkHref="/login/vector-background/stripe-background.jpg"
        ></image>
      </defs>
    </svg>
  );
};

export default StripeVector;
