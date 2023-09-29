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

const StyledImage = styled(Image)`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const StyledTooltip = styled.div`
  position: absolute;
  width: 366px;
  height: auto;
  background: ${({ theme }) => theme.palette.help_tooltip.tooltip.background};
  bottom: 56px;
  right: 350px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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
    top: 15px;
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
  position: absolute;
  top: 6px;
  right: 4px;
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
  StyledImage,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledPattern,
  StyledIconButton,
  StyledNavContainer,
};
