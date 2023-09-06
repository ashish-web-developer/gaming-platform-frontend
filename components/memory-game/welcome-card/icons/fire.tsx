import React from "react";

function Fire() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path fill="url(#pattern0)" d="M0 0H30V30H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.01111)" xlinkHref="#image0_15_52"></use>
        </pattern>
        <image
          id="image0_15_52"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

export default Fire;
