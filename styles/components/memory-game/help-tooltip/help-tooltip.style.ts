import { IconButton } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

const StyledHelpTooltipContainer = styled.div`
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
  height: 130px;
  background: #f5e960;
  bottom: 56px;
  right: 350px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px;
  &::after {
    position: absolute;
    content: "";
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent transparent #f5e960;
    right: -40px;
    top: 15px;
  }
`;

const StyledTooltipHeader = styled.h6`
  color: #f42c04;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledTooltipPara = styled.p`
  color: #2b061e;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledPattern = styled.span`
  position: absolute;
  right: -1px;
  bottom: -5px;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 6px;
  right: 4px;
`;

export {
  StyledHelpTooltipContainer,
  StyledImage,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledPattern,
  StyledIconButton,
};
