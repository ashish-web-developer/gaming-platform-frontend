import styled from "styled-components";

const StyledPokerTimerContainer = styled.div`
  position: absolute;
  right: 0px;
  bottom: 4rem;
  display: flex;
  gap: 16px;
`;

const StyledTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
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
  StyledPokerTimerContainer,
  StyledTimer,
  StyledTimerCount,
  StyledTimerUnit,
};
