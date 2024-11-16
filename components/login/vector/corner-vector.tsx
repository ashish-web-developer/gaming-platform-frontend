// types
import type { FC } from "react";

const CornerVector: FC<{ size: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox={`0 0 ${size} ${size}`}
  >
    <path
      stroke="#D6FFB7"
      strokeWidth="4"
      d="M2 52V18C2 9.163 9.163 2 18 2h34"
    ></path>
  </svg>
);

export default CornerVector;
