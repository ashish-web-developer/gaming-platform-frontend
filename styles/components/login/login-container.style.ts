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

const StyledStripeVectorWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`;

const StyledStripeText = styled.h5`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  top: 0px;
  transform: translateX(17%) rotate(45deg);
  top: 50px;
  @-moz-document url-prefix() {
    transform: translateX(12%) rotate(45deg);
    top: 72px;
  }
`;

const StyledContentContainer = styled.div`
  width: 75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const StyledLogoContainer = styled.div<{
  $show_login: boolean;
}>`
  ${(props) =>
    props.$show_login
      ? `
        position:absolute;
        left:5rem;
        top:5rem;
    `
      : `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        transform: rotate(0deg);
    `}
`;

const StyledLogo = styled.h1<{
  $fontSize: string;
}>`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: ${(props) => props.$fontSize};
  line-height: 1;
`;
const StyledSubTitle = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  font-size: 1.25rem;
  line-height: 1;
`;

const StyledGamesBannerContainer = styled.div`
  display: flex;
  margin-top: 4rem;
`;
const StyledGamesVectorWrapper = styled.div<{
  $margin?: string;
  $height: string;
}>`
  margin: ${(props) => props.$margin ?? "0"};
  height: ${(props) => props.$height};
  position: relative;
`;

const StyledGamesBannerContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
`;

const StyledPokerCardWrapper = styled.div<{
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

const StyledBannerGirlImageWrapper = styled.div`
  position: relative;
  width: 215px;
  height: 299px;
`;

const StyledBannerGirlImage = styled(Image)`
  object-fit: contain;
`;

const StyledBannerGameLogo = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 2rem;
  color: #f5d547;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(-5deg);
  text-align: center;
  line-height: 1.1;
`;
const StyledCta = styled.button`
  position: relative;
  background: transparent;
  border: none;
  top: 4rem;
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

const StyledGirlImageWrapper = styled.div<{
  $width: string;
  $height: string;
}>`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: 0px;
  bottom: 0px;
`;
const StyledGirlImage = styled(Image)`
  object-fit: contain;
`;


export {
  StyledPage,
  StyledStripeVectorWrapper,
  StyledStripeText,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledGamesBannerContent,
  StyledPokerCardWrapper,
  StyledBannerGameLogo,
  StyledCta,
  StyledCtaTextWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledBannerGirlImageWrapper,
  StyledBannerGirlImage,
};
