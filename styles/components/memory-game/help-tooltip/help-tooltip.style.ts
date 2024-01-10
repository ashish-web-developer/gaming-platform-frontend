import { IconButton } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledHelpTooltipContainer = styled(motion.div)`
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 4;
`;

const StyledHelpTooltipImageContainer = styled.div`
  position: relative;
  width: 303px;
  height: 540px;
  bottom: -30px;
`;

const StyledImage = styled(Image)``;

const StyledToolTipContainer = styled.div`
  position: absolute;
  bottom: 290px;
  right: 210px;
  display: flex;
  flex-direction: column;
`;

const StyledVolumeContainer = styled.div`
  width: 78px;
  height: 45px;
  background: ${({ theme }) => theme.palette.help_tooltip.tooltip.background};
  border-radius: 20px 20px 0px 0px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  &::after {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: transparent;
    bottom: 0px;
    right: -20px;
    box-shadow: -10px 10px 0
      ${({ theme }) => theme.palette.help_tooltip.tooltip.background};
  }
`;

const StyledVolumeCta = styled(IconButton)`
  &.MuiIconButton-root {
    margin: 0px;
    padding: 0px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.help_tooltip.volume.background};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 10px;
  }
`;

const StyledTooltip = styled.div`
  width: 366px;
  height: auto;
  background: ${({ theme }) => theme.palette.help_tooltip.tooltip.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 20px 20px;
  padding: 16px;
  padding-bottom: 40px;
  &::after {
    position: absolute;
    content: "";
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.palette.help_tooltip.tooltip.background};
    right: -40px;
    top: 70px;
  }
`;

const StyledTooltipHeader = styled.h6`
  color: ${({ theme }) => theme.palette.help_tooltip.tooltip.tooltip_heading};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledTooltipPara = styled.p`
  position: relative;
  color: ${({ theme }) => theme.palette.help_tooltip.tooltip.tooltip_para};
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  padding-top: 6px;
  z-index: 2;
`;

const StyledPattern = styled.span`
  position: absolute;
  right: -1px;
  bottom: -5px;
  z-index: 0;
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 50px;
    right: 4px;
  }
`;

const StyledNavContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: -2px;
  right: 4px;
  z-index: 1;
`;

export {
  StyledHelpTooltipContainer,
  StyledHelpTooltipImageContainer,
  StyledImage,
  StyledToolTipContainer,
  StyledTooltip,
  StyledVolumeContainer,
  StyledVolumeCta,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledPattern,
  StyledIconButton,
  StyledNavContainer,
};
