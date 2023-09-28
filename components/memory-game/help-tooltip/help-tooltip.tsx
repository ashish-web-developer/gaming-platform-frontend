// types
import type { FC } from "react";

// styled components
import {
  StyledHelpTooltipContainer,
  StyledImage,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledPattern,
  StyledIconButton,
} from "@/styles/components/memory-game/help-tooltip/help-tooltip.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  rules_tooltip_text,
  updateShowHelpTooltip,
} from "@/store/slice/memory-game.slice";

// icons
import CloseIcon from "@/components/memory-game/help-tooltip/icons/close";

const HelpTooltip: FC = () => {
  const dispatch = useAppDispatch();
  const _rules_tooltip_text = useAppSelector(rules_tooltip_text);
  return (
    <StyledHelpTooltipContainer>
      <StyledImage
        alt="help-tooltip-girl"
        width={350}
        height={365}
        src="/memory-game/help-tooltip/help-tooltip-girl.png"
      />
      <StyledTooltip>
        <StyledIconButton
          onClick={() => {
            dispatch(updateShowHelpTooltip(false));
          }}
        >
          <CloseIcon size={33} />
        </StyledIconButton>
        <StyledTooltipHeader>
          {_rules_tooltip_text && _rules_tooltip_text[0]}
        </StyledTooltipHeader>
        <StyledTooltipPara>
          {_rules_tooltip_text && _rules_tooltip_text[1]}
        </StyledTooltipPara>
        <StyledPattern>
          <Pattern />
        </StyledPattern>
      </StyledTooltip>
    </StyledHelpTooltipContainer>
  );
};
export default HelpTooltip;

const Pattern = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="64"
      fill="none"
      viewBox="0 0 105 64"
    >
      <path
        fill="#1E96FC"
        d="M0 64s13.247-24.392 36.742-31.744c11.764-3.681 21.69-1.648 33.402-5.376C90.548 20.386 104.5 0 104.5 0v54c0 5.523-4.477 10-10 10H0z"
      ></path>
    </svg>
  );
};
