// type
import type { FC } from "react";
import type { ICardSuit } from "@/types/store/slice/poker";

const PokerSuit: FC<{
  suit: ICardSuit;
  stroke_color: string;
  fill: string;
}> = ({ suit, stroke_color, fill }) => {
  switch (suit) {
    case "spade":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="9"
          fill="none"
          viewBox="0 0 7 8"
        >
          <path
            fill={fill}
            stroke={stroke_color}
            strokeWidth="0.8"
            d="M3.155.299h0a.167.167 0 01.236 0s0 0 0 0l2.322 2.324h0l.007.007c.352.325.577.81.577 1.356 0 .997-.745 1.781-1.636 1.781-.146 0-.287-.02-.421-.06l-.331-.095.011.344.032.968h0a.167.167 0 01-.166.173H2.76a.167.167 0 01-.167-.172l.032-.969.012-.344-.331.096c-.134.039-.276.06-.421.06C.994 5.767.25 4.982.25 3.985c0-.544.224-1.028.573-1.353h0l.007-.007L3.155.3z"
          ></path>
        </svg>
      );
    case "heart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="7"
          fill="none"
          viewBox="0 0 8 7"
        >
          <path
            fill={fill}
            stroke={stroke_color}
            strokeWidth="0.8"
            d="M3.92 6.643L.814 3.536s0 0 0 0A1.925 1.925 0 013.535.814l.208.208.177.176.177-.176.208-.208a1.924 1.924 0 112.721 2.722s0 0 0 0L3.92 6.643z"
          ></path>
        </svg>
      );
    case "club":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="9"
          fill="none"
          viewBox="0 0 7 8"
        >
          <path
            fill={fill}
            stroke={stroke_color}
            strokeWidth="0.8"
            d="M1.783 2.641l.348-.004-.115-.328a1.55 1.55 0 112.928 0l-.115.328.348.004a1.55 1.55 0 11-.692 2.943l-.373-.18.014.414.033 1.013h0a.167.167 0 01-.167.172H2.968a.167.167 0 01-.167-.172l.033-1.013.014-.414-.373.18a1.55 1.55 0 11-.693-2.943z"
          ></path>
        </svg>
      );
    case "diamond":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path
            fill={fill}
            stroke={stroke_color}
            strokeWidth="0.8"
            d="M4.21.348h0l3.392 3.391c.13.13.13.342 0 .472L4.211 7.602a.333.333 0 01-.472 0L.348 4.211l-.177.176.177-.176a.333.333 0 010-.472h0L3.739.348h0c.13-.13.342-.13.472 0z"
          ></path>
        </svg>
      );
  }
};

export default PokerSuit;
