import { useContext, useEffect, forwardRef } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledHelpTooltipContainer,
  StyledLightImage,
  StyledDarkImage,
  StyledToolTipContainer,
  StyledVolumeContainer,
  StyledVolumeCta,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledPattern,
  StyledIconButton,
  StyledNavContainer,
} from "@/styles/components/memory-game/help-tooltip/help-tooltip.style";

// styled theme
import { useTheme } from "styled-components";

// mui
import { IconButton } from "@mui/material";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  show_help_tooltip,
  help_tooltip_text,
  current_rule_index,
  play_audio,
  // actions
  updateShowHelpTooltip,
  updateCurrentRuleIndex,
  updatePlayAudio,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// icons
import CloseIcon from "@/components/memory-game/help-tooltip/icons/close";
import PrevIcon from "@/components/memory-game/help-tooltip/icons/prev";
import NextIcon from "@/components/memory-game/help-tooltip/icons/next";
import VolumeOffIcon from "@/components/memory-game/help-tooltip/icons/volume-off";
import VolumeOnIcon from "@/components/memory-game/help-tooltip/icons/volume-on";

// framer motion
import { AnimatePresence } from "framer-motion";

// context
import { UttranceContext } from "context";

type IForwardRef = {
  voice: SpeechSynthesisVoice[];
};

const HelpTooltip: ForwardRefRenderFunction<IForwardRef> = ({}, voiceRef) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const SpeechUttrance = useContext(UttranceContext);
  const _mode = useAppSelector(mode);
  const _help_tooltip_text = useAppSelector(help_tooltip_text);
  const _show_help_tooltip = useAppSelector(show_help_tooltip);
  const _current_rule_index = useAppSelector(current_rule_index);
  const _play_audio = useAppSelector(play_audio);

  useEffect(() => {
    const handleEnd = () => {
      if (_current_rule_index < 7) {
        dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
        return;
      }
      dispatch(updateShowHelpTooltip(false));
      dispatch(updateCurrentRuleIndex(0));
    };
    if (
      _show_help_tooltip &&
      _help_tooltip_text &&
      SpeechUttrance &&
      _play_audio
    ) {
      SpeechUttrance.text = _help_tooltip_text[1];
      if (typeof voiceRef !== "function" && voiceRef?.current) {
        SpeechUttrance.uttrance.voice = voiceRef.current.voice.filter((voice) =>
          voice.voiceURI.includes("Female")
        )[0];
      }
      speechSynthesis.speak(SpeechUttrance.uttrance);
      SpeechUttrance.uttrance.addEventListener("end", handleEnd);
    }
    return () => {
      SpeechUttrance?.uttrance.removeEventListener("end", handleEnd);
      speechSynthesis.cancel();
    };
  }, [_show_help_tooltip, _current_rule_index, _play_audio, SpeechUttrance]);

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
          {_mode == "light" ? (
            <StyledLightImage
              alt="help-tooltip-girl"
              width={350}
              height={365}
              src="/memory-game/help-tooltip/light-help-tooltip-girl.png"
            />
          ) : (
            <StyledDarkImage
              alt="help-tooltip-girl"
              width={274}
              height={509}
              src="/memory-game/help-tooltip/dark-help-tooltip-girl.png"
            />
          )}
          <StyledToolTipContainer
            $bottom={_mode == "light" ? "56px" : "290px"}
            $right={_mode == "light" ? "350px" : "180px"}
          >
            <StyledVolumeContainer>
              <StyledVolumeCta
                onClick={() => dispatch(updatePlayAudio(!_play_audio))}
              >
                {_play_audio ? (
                  <VolumeOffIcon
                    size={20}
                    color={theme.palette.help_tooltip.volume.color}
                  />
                ) : (
                  <VolumeOnIcon
                    size={20}
                    color={theme.palette.help_tooltip.volume.color}
                  />
                )}
              </StyledVolumeCta>
            </StyledVolumeContainer>
            <StyledTooltip>
              <StyledIconButton
                onClick={() => {
                  dispatch(updateShowHelpTooltip(false));
                  dispatch(updateCurrentRuleIndex(0));
                }}
              >
                <CloseIcon
                  color={theme.palette.help_tooltip.tooltip.icons}
                  size={33}
                />
              </StyledIconButton>
              <StyledNavContainer>
                <IconButton
                  disabled={_current_rule_index == 0}
                  onClick={() => {
                    dispatch(updateCurrentRuleIndex(_current_rule_index - 1));
                  }}
                >
                  <PrevIcon
                    color={theme.palette.help_tooltip.tooltip.icons}
                    size={33}
                  />
                </IconButton>
                <IconButton
                  disabled={_current_rule_index == 7}
                  onClick={() => {
                    dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
                  }}
                >
                  <NextIcon
                    color={theme.palette.help_tooltip.tooltip.icons}
                    size={33}
                  />
                </IconButton>
              </StyledNavContainer>
              <StyledTooltipHeader>
                {_help_tooltip_text && _help_tooltip_text[0]}
              </StyledTooltipHeader>
              <StyledTooltipPara>
                {_help_tooltip_text && _help_tooltip_text[1]}
              </StyledTooltipPara>
              <StyledPattern>
                <Pattern color={theme.palette.help_tooltip.tooltip.pattern} />
              </StyledPattern>
            </StyledTooltip>
          </StyledToolTipContainer>
        </StyledHelpTooltipContainer>
      )}
    </AnimatePresence>
  );
};
export default forwardRef(HelpTooltip);

const Pattern: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="105"
      height="64"
      fill="none"
      viewBox="0 0 105 64"
    >
      <path
        fill={color}
        d="M0 64s13.247-24.392 36.742-31.744c11.764-3.681 21.69-1.648 33.402-5.376C90.548 20.386 104.5 0 104.5 0v54c0 5.523-4.477 10-10 10H0z"
      ></path>
    </svg>
  );
};
