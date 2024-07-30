// types
import type { FC } from "react";

const UpsideDownTriangle: FC<{
  size: number;
  color: string;
  stroke: string;
}> = ({ size, color, stroke }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        fill={color}
        stroke={stroke}
        strokeWidth="2"
        d="M15.928 1L9 13 2.072 1h13.856z"
      ></path>
    </svg>
  );
};

export default UpsideDownTriangle;
