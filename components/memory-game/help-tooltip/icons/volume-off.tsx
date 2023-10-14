// types
import type { FC } from "react";
const VolumeOffIcon: FC<{ size: number; color: string }> = ({
  size,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 25 19"
    >
      <path
        fill={color}
        d="M10.5.47L6.154 4.811H1.172C.524 4.812 0 5.337 0 5.984v7.032c0 .647.524 1.171 1.172 1.171h4.983l4.344 4.344c.734.734 2.001.218 2.001-.829V1.298c0-1.048-1.268-1.562-2-.829zM22.54 9.5l2.229-2.229a.788.788 0 000-1.114l-1.115-1.114a.788.788 0 00-1.114 0l-2.229 2.228-2.228-2.228a.788.788 0 00-1.114 0l-1.114 1.114a.788.788 0 000 1.114L18.084 9.5l-2.228 2.228a.788.788 0 000 1.114l1.114 1.114a.788.788 0 001.114 0l2.229-2.227 2.228 2.228a.788.788 0 001.114 0l1.114-1.114a.788.788 0 000-1.114L22.541 9.5z"
      ></path>
    </svg>
  );
};

export default VolumeOffIcon;
