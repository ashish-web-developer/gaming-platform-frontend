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
  width: 600px;
  height: 600px;
  bottom: -30px;
  right: -140px;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
`;

const StyledToolTipContainer = styled.div`
  position: absolute;
  bottom: 340px;
  right: 240px;
  display: flex;
  flex-direction: column;
`;

const StyledVolumeContainer = styled.div`
  width: 78px;
  height: 45px;
  background: ${({ theme }) => theme.palette.primary.contrast};
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
    box-shadow: -10px 10px 0 ${({ theme }) => theme.palette.primary.contrast};
  }
`;

const StyledVolumeCta = styled.button`
  background: ${({ theme }) => theme.palette.primary.dark};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 8px;
`;

const StyledTooltip = styled.div`
  width: 366px;
  height: auto;
  background: ${({ theme }) => theme.palette.primary.contrast};
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
      ${({ theme }) => theme.palette.primary.contrast};
    right: -40px;
    top: 70px;
  }
`;

const StyledTooltipHeader = styled.h6`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledTooltipPara = styled.p`
  position: relative;
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  padding-top: 6px;
  z-index: 2;
`;

const StyledCloseIconCta = styled.button`
  position: absolute;
  right: 6px;
  background: transparent;
  cursor: pointer;
  border: none;
`;

const StyledNavContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 16px;
  bottom: 2px;
  right: 6px;
  z-index: 1;
`;
const StyledIconCta = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
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
  StyledCloseIconCta,
  StyledNavContainer,
  StyledIconCta,
};
