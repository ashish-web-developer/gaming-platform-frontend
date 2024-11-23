// types
import type { FC } from "react";
const CameraIcon: FC<{ color: string; size: number }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 18V8a1 1 0 011-1h1.5l1.707-1.707A1 1 0 018.914 5h6.172a1 1 0 01.707.293L17.5 7H19a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1z"
      ></path>
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );
};

export default CameraIcon;
