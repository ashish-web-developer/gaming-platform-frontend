import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: red;
  background: url("login/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContentContainer = styled.div`
  width: 75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transform: rotate(-5deg);
`;

const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: 5rem;
  line-height: 1;
`;
const StyledSubTitle = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.25rem;
  line-height: 1;
`;

const StyledGamesBannerContainer = styled.div`
  display: flex;
  margin-top: 4rem;
`;
const StyledGamesVectorWrapper = styled.div`
  margin-top: 60px;
  margin-left: -70px;
`;

const StyledCta = styled.button`
  position: relative;
  background: transparent;
  border: none;
  top: 4rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.light};
  cursor: pointer;
`;
const StyledCtaTextWrapper = styled.span`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%) rotate(-6deg);
  font-size: 1.5rem;
  line-height: 1;
`;

const StyledGirlImageWrapper = styled.div`
  position: absolute;
  width: 587px;
  height: 643px;
  left: 0px;
  bottom: 0px;
`;
const StyledGirlImage = styled(Image)``;

export {
  StyledPage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledCta,
  StyledCtaTextWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
};
