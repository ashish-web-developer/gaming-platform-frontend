import Image from "next/image";
// types
import type { FC } from "react";

// styled components
import {
  StyledRulesTooltipContainer,
  StyledRulesTooltip,
  StyledCloseIconContainer,
  StyledContent,
  StyledHeading,
  StyledPara,
  StyledIcons,
  StyledTooltipGirl
} from "@/styles/components/memory-game/rules-tooltip/rules-tooltip.style";

// background
import Background from "@/components/memory-game/rules-tooltip/icons/rules-tooltip-background";

// icons
import Close from "@/components/memory-game/rules-tooltip/icons/close";

const RulesTooltip: FC = () => {
  return (
    <>
      <StyledTooltipGirl width = {153} height = {470} alt = "girl" src = "/memory-game/rules-tooltip/tooltip-girl/tooltip-girl-1.png"/>
      <StyledRulesTooltipContainer>
        <Background />
        <StyledRulesTooltip>
          <StyledCloseIconContainer>
            <Close />
          </StyledCloseIconContainer>
          <StyledContent>
            <StyledHeading>Memory Game: Rules and How to Play</StyledHeading>
            <StyledPara>
              Memory, also known as Concentration, is a classic card-matching game
              that tests your memory skills and attention to detail. Here's how to
              play this engaging game:
            </StyledPara>
          </StyledContent>
          <StyledIcons>
            <Image alt = "prev" width = {30} height = {30} src = "/memory-game/rules-tooltip/Previous.png"/>
            <Image alt = "last" width = {30} height = {30} src = "/memory-game/rules-tooltip/Last.png"/>
          </StyledIcons>
        </StyledRulesTooltip>
      </StyledRulesTooltipContainer>
    </>
  );
};

export default RulesTooltip;
