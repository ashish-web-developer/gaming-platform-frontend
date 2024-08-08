import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/poker/background.jpg");
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

const StyledGirlImageWrapper = styled.div`
  width: 100%;
  height: 800px;
  position: fixed;
  bottom: 0px;
  @media (max-height: 800px) {
    height: 750px;
  }
  @media (max-height: 750px) {
    height: 630px;
  }
`;
const StyledGirlImage = styled(Image)`
  object-fit: contain;
`;

const StyledMobileLogoWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 60px;
  width:100%;
  @media (max-height: 900px) {
    top:40px;
  }
  @media (max-height: 750px) {
    top:30px;
  }
`;
const StyledMobileLogo = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  text-align: center;
  text-shadow: -2px -2px 0 ${({ theme }) => theme.palette.warning.main},
    2px -2px 0 ${({ theme }) => theme.palette.warning.main},
    -2px 2px 0 ${({ theme }) => theme.palette.warning.main},
    2px 2px 0 ${({ theme }) => theme.palette.warning.main},
    -2px 0px 0 ${({ theme }) => theme.palette.warning.main},
    2px 0px 0 ${({ theme }) => theme.palette.warning.main},
    0px -2px 0 ${({ theme }) => theme.palette.warning.main},
    0px 2px 0 ${({ theme }) => theme.palette.warning.main};
  transform: rotate(-6deg);
  @media (max-width: ${({ theme }) => theme.breakpoints.xxs}) {
    font-size: 1.875rem;
  }
`;

export {
  StyledPage,
  StyledContainer,
  StyledMobileLogoWrapper,
  StyledMobileLogo,
  StyledGirlImageWrapper,
  StyledGirlImage,
};
