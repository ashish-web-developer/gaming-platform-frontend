// mui
import { Box, IconButton, Button } from "@mui/material";

// styled
import styled from "styled-components";

type IStyledTrofyImage = {
  $showBackground: boolean;
};

const StyledTooltipContainer = styled(Box)`
  width: 100vw;
  height: 100%;
  background: ${({ theme }) => theme.palette.help_tooltip.mobile.background};
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

const StyledVolumeCta = styled(IconButton)`
  &.MuiIconButton-root{
    position: absolute;
    padding: 0px;
    margin: 0px;
    width: 60px;
    height: 60px;
    background: #2b061e;
    top: calc(100vw / 1.14 - 70px);
    left: 14px;
    z-index: 2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
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
  color: ${({ theme }) => theme.palette.help_tooltip.mobile.heading};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledPara = styled.p`
  color: ${({ theme }) => theme.palette.help_tooltip.mobile.para};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledTrofyImage = styled.div<IStyledTrofyImage>`
  width: 200px;
  height: 283px;
  align-self: center;
  position: relative;
  &::before {
    display: ${(props) => (props.$showBackground ? "block" : "none")};
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: -1;
    filter: blur(150px);
  }
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

const StyledNavCta = styled(IconButton)`
  margin: 0px;
  padding: 0px;
`;

const StyledBackButton = styled(Button)`
  &.MuiButton-root{
    background-color: ${({ theme }) =>
      theme.palette.help_tooltip.mobile.back_cta.background};
    border-radius: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: ${({ theme }) =>
      theme.palette.help_tooltip.mobile.back_cta.text_color};
    font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
    font-weight: 600;
  }
`;
const StyledBackIconContainer = styled.span`
  width: 30px;
  height: 30px;
  background: ${({ theme }) =>
    theme.palette.help_tooltip.mobile.back_cta.start_icon_background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -6px;
  margin-right: 4px;
`;

export {
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
