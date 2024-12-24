import { useId } from "react";
// types
import type { FC } from "react";
import type { ICardSuit } from "@/types/store/slice/poker";

const SvgPath: FC<{
  suit_type: ICardSuit;
  stroke: string;
  stroke_width: number;
  fill: string;
}> = ({ suit_type, ...props }) => {
  switch (suit_type) {
    case "diamond":
      return (
        <path
          {...props}
          d="M9.302 2.519a.917.917 0 0 1 1.296 0l.163-.164-.163.164 6.783 6.783a.917.917 0 0 1 0 1.296l-6.783 6.783a.917.917 0 0 1-1.296 0l-6.783-6.783-.177.177.177-.177a.917.917 0 0 1 0-1.296l-.177-.176.177.176z"
        ></path>
      );
    case "spade":
      return (
        <path
          {...props}
          d="M10.134 2.421a.584.584 0 0 1 .825 0l4.645 4.648.007.007c.753.698 1.232 1.736 1.232 2.897 0 2.112-1.582 3.812-3.52 3.812q-.475-.001-.913-.13l-.33-.095.01.344.065 1.937a.583.583 0 0 1-.583.602h-2.05a.583.583 0 0 1-.583-.602l.064-1.937.011-.344-.33.096q-.438.128-.913.129c-1.938 0-3.521-1.7-3.521-3.812 0-1.157.476-2.192 1.226-2.89l.006-.007z"
        ></path>
      );
    case "heart":
      return (
        <path
          {...props}
          d="m16.23 11.25-6.39 6.39-6.39-6.39a4.1 4.1 0 0 1 5.798-5.8l.415.416.177.177.177-.177.415-.415a4.099 4.099 0 1 1 5.797 5.798Z"
        ></path>
      );
    case "club":
      return (
        <path
          {...props}
          d="m7.563 7.032.348-.003-.115-.329a3.349 3.349 0 1 1 6.328 0l-.115.329.348.003a3.349 3.349 0 1 1-1.497 6.362l-.373-.181.014.414.067 2.027a.583.583 0 0 1-.583.603h-2.05a.583.583 0 0 1-.583-.603l.067-2.027.014-.414-.373.18a3.349 3.349 0 1 1-1.497-6.362Z"
        ></path>
      );
  }
};

const Suit: FC<{
  size: number;
  stroke: string;
  stroke_width: number;
  suit_type: ICardSuit;
  show_image?: boolean;
}> = ({ size, show_image = false, ...props }) => {
  const pattern_id = useId();
  const image_id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <SvgPath {...props} fill={show_image ? `url(#${pattern_id})` : "none"} />
      <defs>
        <pattern
          id={pattern_id}
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref={`#${image_id}`}
            transform="matrix(.00117 0 0 .00105 0 -.165)"
          ></use>
        </pattern>
        <image
          id={image_id}
          width="852"
          height="1272"
          xlinkHref="/poker/icons/svg/background.png"
        ></image>
      </defs>
    </svg>
  );
};

export default Suit;
