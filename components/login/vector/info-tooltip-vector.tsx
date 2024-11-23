// types
import type { FC } from "react";

const InfoTooltipVector: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="302"
      height="146"
      fill="none"
      viewBox="0 0 302 146"
    >
      <path
        fill="#000"
        stroke="#D6FFB7"
        strokeWidth="4"
        d="M299 115.564L282.934 3 85.328 28.156 67.656 90.834l-29.454-18.76-9.64 18.76H5l33.202 36.243v-22.598L85.328 142l9.104-26.436H299z"
      ></path>
    </svg>
  );
};

export const ErrorInfoTooltipVector: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="302"
      height="146"
      fill="none"
      viewBox="0 0 302 146"
    >
      <path
        fill="#000"
        stroke="#F42C04"
        strokeWidth="4"
        d="M3 115.564L19.066 3l197.606 25.156 17.672 62.678 29.454-18.76 9.639 18.76H297l-33.202 36.243v-22.598L216.672 142l-9.104-26.436H3z"
      ></path>
    </svg>
  );
};

export default InfoTooltipVector;
