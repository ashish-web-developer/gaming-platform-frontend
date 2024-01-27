// styled
import styled from "styled-components";

const StyledTooltipDrawer = styled.dialog`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const StyledTooltipContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.contrast};
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("/memory-game/help-tooltip/mobile/background.png");
    top: 0px;
    left: 0px;
  }
`;

const StyledTopBackground = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 350px;
`;

const StyledVolumeCta = styled.button`
  position: absolute;
  padding: 0px;
  margin: 0px;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.palette.primary.dark};
  top: calc(100vw / 1.14 - 70px);
  left: 14px;
  z-index: 2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  position: absolute;
  top: calc(100vw / 1.14 + 30px);
  z-index: 2;
  padding: 0px 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledHeader = styled.h6`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledPara = styled.p`
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledTrofyImage = styled.div<{
  $showBackground: boolean;
}>`
  width: 200px;
  height: 283px;
  align-self: center;
  position: relative;
  @media (max-height: 840px) {
    display: none;
  }
`;

const StyledBottomCta = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  width: 100%;
  padding: 0 1.2rem 24px 1.2rem;
  align-items: center;
`;

const StyledNavIconContainer = styled.span`
  display: flex;
  gap: 10px;
`;

const StyledNavCta = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackButton = styled.button`
  background: ${({ theme }) => theme.palette.primary.dark};
  padding: 14px 24px 14px 48px;
  color: ${({ theme }) => theme.palette.primary.light};
  position: relative;
  border: none;
  border-radius: 30px;
  font-family: ${({ theme }) => theme.palette.primary.poppins};
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const StyledBackIconContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.palette.primary.light};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -6px;
  margin-right: 4px;
`;

export {
  StyledTooltipDrawer,
  StyledTooltipContainer,
  StyledTopBackground,
  StyledVolumeCta,
  StyledContent,
  StyledHeader,
  StyledPara,
  StyledTrofyImage,
  StyledBottomCta,
  StyledNavIconContainer,
  StyledNavCta,
  StyledBackButton,
  StyledBackIconContainer,
};
