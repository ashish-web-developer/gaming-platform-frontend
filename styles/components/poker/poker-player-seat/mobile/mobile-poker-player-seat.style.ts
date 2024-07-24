import styled from "styled-components";
// types
import type { ISeatType } from "@/types/store/slice/poker/poker";

const StyledPokerPlayerSeatWrapper = styled.div<{
  $seat_number: ISeatType;
  $betted_amount: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  &::after {
    content: "${(props) =>
      props.$betted_amount !== 0 ? `$ ${props.$betted_amount}K` : ""}";
    position: absolute;
    display: ${(props) => (props.$betted_amount ? "inline-block" : "none")};
    background: ${({ theme }) => theme.palette.primary.main};
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    font-family: ${({ theme }) => theme.fontFamily.lobster};
    font-size: 12px;
    color: #fff;
    padding: 4px 10px;
    border-radius: 16px;
    ${(props) => {
      switch (props.$seat_number) {
        case 0:
        case 1:
        case 2:
          return `
            top: 20px;
            right: -50px;
          `;
        case 3:
          return `
            top:-40px;
          `;
        case 4:
        case 5:
        case 6:
          return `
            top: 20px;
            left:-50px;
          `;
      }
    }}
  }
`;

const StyledPokerPlayerBuyInAmount = styled.span`
  position: relative;
  z-index: 3;
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  padding: 6px 10px;
  font-size: 0.875rem;
  white-space: nowrap;
  border: 3px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.primary.light};
`;

export { StyledPokerPlayerSeatWrapper, StyledPokerPlayerBuyInAmount };
