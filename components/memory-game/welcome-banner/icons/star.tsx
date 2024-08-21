import { forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";

const StarIcon: ForwardRefRenderFunction<
  SVGSVGElement,
  { size: number; color: string }
> = ({ size, color }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M8.962.752L11.8 7.44l7.238-.633-5.484 4.766 2.84 6.688-6.229-3.742-5.483 4.767 1.634-7.08L.09 8.466l7.238-.633L8.962.752z"
      ></path>
    </svg>
  );
};
export default forwardRef(StarIcon);
