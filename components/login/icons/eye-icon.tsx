// types
import type { FC } from "react";
const EyeIcon: FC<{ color: string; size: number }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        stroke={color}
        strokeWidth="2"
        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z"
      ></path>
      <path
        stroke={color}
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );
};

export const CloseEyeIcon: FC<{ color: string; size: number }> = ({
  size,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      className="w-6 h-6 text-gray-800 dark:text-white"
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.933 13.909A4.357 4.357 0 013 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0121 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19L19 5m-4 7a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );
};

export default EyeIcon;
