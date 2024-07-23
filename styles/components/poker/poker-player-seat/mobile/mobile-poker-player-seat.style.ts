import styled from "styled-components";

const StyledPokerPlayerSeatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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
