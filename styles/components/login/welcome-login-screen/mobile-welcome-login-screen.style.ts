import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: url("login/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBottomContentContainer = styled.div`
  position: absolute;
  bottom: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 3.375rem;
  color: ${({ theme }) => theme.palette.primary.light};
  line-height: 1;
`;
const StyledLogoSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.info.main};
  line-height: 1;
`;

const StyledCta = styled.button`
  position: relative;
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.light};
  cursor: pointer;
  transform: rotate(5deg);
`;

const StyledCtaTextWrapper = styled.span`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%) rotate(-6deg);
  font-size: 1.5rem;
  line-height: 1;
  @-moz-document url-prefix() {
    transform: translate(-50%, -55%) rotate(-6deg);
  }
`;

const StyledInfoText = styled.h2`
  position: absolute;
  font-size: 2.25rem;
  font-family: "Lobster", sans-serif;
  color: #f5d547;
  top: 60px;
  right: 48px;
`;

const StyledCurveArrowVectorWrapper = styled.div`
  position: absolute;
  top: 110px;
  left: 168px;
`;

const StyledBannerContent = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const StyledCardWrapper = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $rotate: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  transform: rotate(${(props) => props.$rotate});
`;

const StyledImageWrapper = styled.div`
  position: absolute;
  width: 154px;
  height: 184px;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledImage = styled(Image)`
  object-fit: contain;
`;

const StyledPokerLogo = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
  text-align: center;
`;

export {
  StyledPage,
  StyledBottomContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSubtitle,
  StyledCta,
  StyledCtaTextWrapper,
  StyledInfoText,
  StyledCurveArrowVectorWrapper,
  StyledBannerContent,
  StyledCardWrapper,
  StyledImageWrapper,
  StyledImage,
  StyledPokerLogo,
};
