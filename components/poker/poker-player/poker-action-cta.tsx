// types
import type { FC } from "react";

// styled components
import {
  StyledPokerActionCta,
  StyledVectorWrapper,
} from "@/styles/components/poker/poker-player/poker-action-cta.style";

const PokerActionCta = () => {
  return (
    <StyledPokerActionCta>
      <StyledVectorWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="95"
          height="109"
          fill="none"
          viewBox="0 0 95 109"
        >
          <mask id="path-1-inside-1_123_99" fill="#fff">
            <path d="M.753 108.753A125 125 0 0163.253.5l31.25 54.126a62.501 62.501 0 00-31.25 54.127H.753z"></path>
          </mask>
          <path
            fill="#000"
            stroke="#F5D547"
            strokeWidth="4"
            d="M.753 108.753A125 125 0 0163.253.5l31.25 54.126a62.501 62.501 0 00-31.25 54.127H.753z"
            mask="url(#path-1-inside-1_123_99)"
            onClick={() => {
              console.log("card get folded");
            }}
          ></path>
        </svg>
      </StyledVectorWrapper>
      <StyledVectorWrapper $left="64px" $top="-18px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="72"
          fill="none"
          viewBox="0 0 126 72"
        >
          <mask id="path-1-inside-1_123_100" fill="#fff">
            <path d="M.253 17.5a125 125 0 01125 0l-31.25 54.127a62.5 62.5 0 00-62.5 0L.253 17.5z"></path>
          </mask>
          <path
            fill="#000"
            stroke="#F5D547"
            strokeWidth="4"
            d="M.253 17.5a125 125 0 01125 0l-31.25 54.127a62.5 62.5 0 00-62.5 0L.253 17.5z"
            mask="url(#path-1-inside-1_123_100)"
            onClick={() => {
              console.log("checked");
            }}
          ></path>
        </svg>
      </StyledVectorWrapper>
      <StyledVectorWrapper $left="159px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="94"
          height="109"
          fill="none"
          viewBox="0 0 94 109"
        >
          <mask id="path-1-inside-1_123_102" fill="#fff">
            <path d="M31.253.5a125 125 0 0162.5 108.253h-62.5A62.499 62.499 0 00.003 54.627L31.253.5z"></path>
          </mask>
          <path
            fill="#000"
            stroke="#F5D547"
            strokeWidth="4"
            d="M31.253.5a125 125 0 0162.5 108.253h-62.5A62.499 62.499 0 00.003 54.627L31.253.5z"
            mask="url(#path-1-inside-1_123_102)"
            onClick={() => {
              console.log("Raised");
            }}
          ></path>
        </svg>
      </StyledVectorWrapper>
    </StyledPokerActionCta>
  );
};
export default PokerActionCta;
