// types
import type { FC } from "react";
import type { ICardSuit } from "@/types/store/slice/poker";

const SvgPath: FC<{
  suit_type: ICardSuit;
  stroke: string;
  stroke_width: number;
}> = ({ suit_type, stroke, stroke_width }) => {
  switch (suit_type) {
    case "diamond":
      return (
        <path
          stroke={stroke}
          strokeWidth={stroke_width}
          d="m31.264 8.086 20.35 20.35a2 2 0 0 1 0 2.829l-20.35 20.35 1.061 1.06-1.06-1.06a2 2 0 0 1-2.83 0l-20.35-20.35a2 2 0 0 1 0-2.83l20.35-20.35a2 2 0 0 1 2.83 0Z"
        ></path>
      );
    case "spade":
      return (
        <path
          stroke={stroke}
          strokeWidth={stroke_width}
          d="M30.932 7.793a1 1 0 0 1 1.415 0L46.28 21.738l.02.02.022.02c2.107 1.952 3.458 4.867 3.458 8.14 0 5.978-4.467 10.687-9.813 10.687a9 9 0 0 1-2.529-.358l-1.984-.575.068 2.065.193 5.81a1 1 0 0 1-1 1.033h-6.149a1 1 0 0 1-1-1.033l.193-5.81.068-2.065-1.985.575a9 9 0 0 1-2.528.358c-5.347 0-9.814-4.709-9.814-10.686 0-3.264 1.342-6.17 3.438-8.123l.02-.018.02-.02z"
        ></path>
      );
    case "heart":
      return (
        <path
          stroke={stroke}
          strokeWidth={stroke_width}
          d="M29.52 51.859 10.882 33.217A11.55 11.55 0 0 1 7.5 25.05c0-6.38 5.17-11.55 11.547-11.55 3.063 0 6 1.217 8.166 3.383l1.246 1.247 1.06 1.06 1.062-1.06 1.247-1.247a11.55 11.55 0 0 1 8.165-3.383c6.377 0 11.547 5.171 11.547 11.55 0 3.063-1.217 6.001-3.382 8.167z"
        ></path>
      );
    case "club":
      return (
        <path
          stroke={stroke}
          strokeWidth={stroke_width}
          d="m22.697 21.847 2.088-.022-.688-1.972a9.3 9.3 0 0 1-.515-3.06c0-5.131 4.162-9.293 9.298-9.293s9.299 4.162 9.299 9.294a9.3 9.3 0 0 1-.516 3.06l-.687 1.97 2.088.023c5.089.054 9.196 4.195 9.196 9.293 0 5.132-4.162 9.294-9.298 9.294a9.26 9.26 0 0 1-4.055-.928l-2.236-1.084.082 2.484.202 6.081a1 1 0 0 1-1 1.033h-6.15a1 1 0 0 1-1-1.033l.201-6.081.083-2.484-2.236 1.085a9.3 9.3 0 0 1-4.055.927c-5.136 0-9.298-4.162-9.298-9.294 0-5.098 4.108-9.239 9.197-9.293Z"
        ></path>
      );
  }
};

const Suit: FC<{
  stroke: string;
  stroke_width: number;
  suit_type: ICardSuit;
}> = ({ stroke, stroke_width, suit_type }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="none"
      viewBox="0 0 60 60"
    >
      <SvgPath
        stroke={stroke}
        stroke_width={stroke_width}
        suit_type={suit_type}
      />
    </svg>
  );
};

export default Suit;
