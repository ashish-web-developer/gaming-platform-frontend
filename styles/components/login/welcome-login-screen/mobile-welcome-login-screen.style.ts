import styled from "styled-components";

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
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:32px;
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

export {
  StyledPage,
  StyledBottomContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSubtitle,
  StyledCta,
  StyledCtaTextWrapper,
};
