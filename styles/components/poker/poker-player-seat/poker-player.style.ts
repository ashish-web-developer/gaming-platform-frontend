import styled from "styled-components";
import Image from "next/image";

const StyledPokerPlayerWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid ${({ theme }) => theme.palette.info.main};
  position: absolute;
  z-index: 1;
  background: #000;
`;
const StyledHoleCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 40px);
  position: relative;
  transform: rotate(16deg);
  & > :first-child {
    rotate: -6deg;
  }
  & > :last-child {
    left: -20px;
    rotate: 6deg;
  }
`;

const StyledPokerPlayerDetails = styled.div`
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0;
  z-index: 2;
`;

const StyledPlayerName = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.info.main};
  white-space: nowrap;
  line-height: 1;
`;
const StyledPlayerAmount = styled.h6`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.info.main};
  white-space: nowrap;
  line-height: 1;
`;

export {
  StyledPokerPlayerWrapper,
  StyledHoleCardWrapper,
  StyledPokerPlayerDetails,
  StyledPlayerName,
  StyledPlayerAmount,
};
