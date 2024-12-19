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
const StyledContainer = styled.div`
  width: 75rem;
  height: 100%;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
`;


export {
  StyledPage,
  StyledContainer,
};
