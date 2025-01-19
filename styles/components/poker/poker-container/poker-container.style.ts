import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/poker/background.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  user-select: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
    background: url("/poker/mobile-background.jpg");
    background-size: cover;
  }
`;
const StyledContainer = styled.div<{
  $opacity: number;
}>`
  width: 75rem;
  height: 100%;
  display: flex;
  padding: 4rem 0px;
  flex-direction: column;
  position: relative;
  opacity: ${(props) => props.$opacity};
`;

const StyledPokerTimerContainer = styled.div`
  position: absolute;
  right: 0px;
  bottom: 4rem;
`;

export { StyledPage, StyledContainer, StyledPokerTimerContainer };
