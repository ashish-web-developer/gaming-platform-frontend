// types
import type { FC } from "react";
const BackIcon: FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 13 22"
    >
      <path
        fill={color}
        d="M.343 9.832L9.833.343a1.172 1.172 0 011.657 0l1.107 1.107c.457.457.458 1.197.002 1.655l-7.521 7.556 7.52 7.556a1.171 1.171 0 01-.001 1.655L11.49 20.98c-.458.458-1.2.458-1.658 0L.343 11.49a1.172 1.172 0 010-1.657z"
      ></path>
    </svg>
  );
};

export default BackIcon;
