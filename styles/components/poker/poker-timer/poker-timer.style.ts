import styled from "styled-components";

const StyledPokerTimerWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledTimer = styled.div<{
  $border_color:string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  padding: 10px;
  border: 2px solid ${(prop)=>prop.$border_color};
  border-radius: 6px;
  background: linear-gradient(#1e1e1e 50%, #848484 100%);
`;
const StyledTimerCount = styled.span`
  font-size: 2rem;
  line-height: 1;
`;
const StyledTimerUnit = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

export {
  StyledPokerTimerWrapper,
  StyledTimer,
  StyledTimerCount,
  StyledTimerUnit,
};
