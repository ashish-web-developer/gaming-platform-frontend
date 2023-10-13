// types
import type { FC } from "react";

const TimerIcon: FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="#fff"
        d="M9 0C4.028 0 0 4.028 0 9s4.028 9 9 9 9-4.028 9-9-4.028-9-9-9zm2.072 12.705l-3.2-2.326a.438.438 0 01-.178-.352V3.919c0-.24.196-.435.435-.435h1.742c.24 0 .435.196.435.435v4.998l2.305 1.676a.435.435 0 01.094.61l-1.023 1.408a.438.438 0 01-.61.094z"
      ></path>
    </svg>
  );
};

export default TimerIcon;
