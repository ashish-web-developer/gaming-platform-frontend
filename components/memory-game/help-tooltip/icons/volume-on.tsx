// types
import type { FC } from "react";

const VolumeOnIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 19 19"
    >
      <path
        fill={color}
        d="M10.5.344L6.154 4.688H1.172C.524 4.688 0 5.212 0 5.859v7.032c0 .647.524 1.172 1.172 1.172h4.983l4.344 4.343c.734.734 2.001.218 2.001-.829V1.173c0-1.048-1.268-1.562-2-.83zm6.015 5.277a1.173 1.173 0 00-1.13 2.054c.63.347 1.021.998 1.021 1.7s-.391 1.354-1.021 1.7a1.173 1.173 0 001.13 2.054 4.294 4.294 0 002.235-3.754 4.293 4.293 0 00-2.235-3.754z"
      ></path>
    </svg>
  );
};

export default VolumeOnIcon;
