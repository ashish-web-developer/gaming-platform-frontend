import { useContext, useEffect, useCallback } from "react";
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
  StyledNavContainer,
} from "@/styles/components/memory-game/help-tooltip/help-tooltip.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  show_help_tooltip,
  help_tooltip_text,
  current_rule_index,
  updateShowHelpTooltip,
  updateCurrentRuleIndex,
} from "@/store/slice/memory-game.slice";

// icons
import CloseIcon from "@/components/memory-game/help-tooltip/icons/close";
import PrevIcon from "@/components/memory-game/help-tooltip/icons/prev";
import NextIcon from "@/components/memory-game/help-tooltip/icons/next";

// framer motion
import { AnimatePresence } from "framer-motion";

// context
import { UttranceContext } from "context";
import { IconButton } from "@mui/material";

const HelpTooltip: FC = () => {
  const dispatch = useAppDispatch();
  const SpeechUttrance = useContext(UttranceContext);
  const _help_tooltip_text = useAppSelector(help_tooltip_text);
  const _show_help_tooltip = useAppSelector(show_help_tooltip);
  const _current_rule_index = useAppSelector(current_rule_index);

  const handleEnd = () => {
    if (_current_rule_index < 7) {
      dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
      return;
    }
    dispatch(updateShowHelpTooltip(false));
    dispatch(updateCurrentRuleIndex(0));
  };

  useEffect(() => {
    if (_show_help_tooltip && _help_tooltip_text && SpeechUttrance) {
      SpeechUttrance.text = _help_tooltip_text[1];
      speechSynthesis.speak(SpeechUttrance.uttrance);
      SpeechUttrance.uttrance.addEventListener("end", handleEnd);
    }
    return () => {
      SpeechUttrance?.uttrance.removeEventListener("end", handleEnd);
      speechSynthesis.cancel();
    };
  }, [_show_help_tooltip, _current_rule_index]);
  return (
    <AnimatePresence>
      {_show_help_tooltip && (
        <StyledHelpTooltipContainer
          initial={{
            x: 750,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: 750,
          }}
        >
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
                dispatch(updateCurrentRuleIndex(0));
              }}
            >
              <CloseIcon size={33} />
            </StyledIconButton>
            <StyledNavContainer>
              <IconButton
                onClick={() => {
                  dispatch(updateCurrentRuleIndex(_current_rule_index - 1));
                }}
              >
                <PrevIcon size={33} />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
                }}
              >
                <NextIcon size={33} />
              </IconButton>
            </StyledNavContainer>
            <StyledTooltipHeader>
              {_help_tooltip_text && _help_tooltip_text[0]}
            </StyledTooltipHeader>
            <StyledTooltipPara>
              {_help_tooltip_text && _help_tooltip_text[1]}
            </StyledTooltipPara>
            <StyledPattern>
              <Pattern />
            </StyledPattern>
          </StyledTooltip>
        </StyledHelpTooltipContainer>
      )}
    </AnimatePresence>
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
