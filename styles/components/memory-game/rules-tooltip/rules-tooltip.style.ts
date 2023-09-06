import Image from "next/image";
// styled
import styled from "styled-components";
// icons
import Close from "@/components/memory-game/rules-tooltip/icons/close";

const StyledRulesTooltipContainer = styled.div`
  position: absolute;
  right: 150px;
  width: 416px;
  height: 163px;
  flex-shrink: 0;
  z-index: 3;
`;

const StyledRulesTooltip = styled.div`
  position: absolute;
  width: 380px;
  height: 150px;
  background-color: #000;
  top: 13px;
  left: 5px;
  border-radius: 14px;
  background: url("/memory-game/rules-tooltip/background.png"), #000;
  background-size: 100% 150%;
  background-position: 0;
  padding: 18px 24px;
  &::after{
    content:"";
    position:absolute;
    top:15px;
    right:-50px;
    border-width:25px;
    border-style:solid;
    border-color:transparent transparent transparent #000;
  }
`;

const StyledCloseIconContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const StyledContent = styled.div``;

const StyledHeading = styled.h6`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledPara = styled.div`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top:8px;
`;

const StyledIcons = styled.div`
  position:absolute;
  display:flex;
  bottom:8px;
  right:20px;
  gap:14px;
`

const StyledTooltipGirl = styled(Image)`
  position:absolute;
  bottom:30px;
  right: 30px;
`

export {
  StyledRulesTooltipContainer,
  StyledRulesTooltip,
  StyledCloseIconContainer,
  StyledContent,
  StyledHeading,
  StyledIcons,
  StyledPara,
  StyledTooltipGirl
};
