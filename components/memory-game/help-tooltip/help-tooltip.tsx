import { useContext, useEffect, forwardRef } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// styled components
import {
  StyledHelpTooltipContainer,
  StyledHelpTooltipImageContainer,
  StyledImage,
  StyledToolTipContainer,
  StyledVolumeContainer,
  StyledVolumeCta,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledCloseIconCta,
  StyledNavContainer,
  StyledIconCta,
} from "@/styles/components/memory-game/help-tooltip/help-tooltip.style";

// styled theme
import { useTheme } from "styled-components";

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
  const theme = useTheme() as ITheme;
  const SpeechUttrance = useContext(UttranceContext);
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
          <StyledHelpTooltipImageContainer>
            <StyledImage
              alt="girl"
              fill={true}
              src={"/memory-game/help-tooltip/help-tooltip-girl.png"}
            />
          </StyledHelpTooltipImageContainer>
          <StyledToolTipContainer>
            <StyledVolumeContainer>
              <StyledVolumeCta
                onClick={() => dispatch(updatePlayAudio(!_play_audio))}
              >
                {_play_audio ? (
                  <VolumeOffIcon
                    size={20}
                    color={theme.palette.primary.light}
                  />
                ) : (
                  <VolumeOnIcon size={20} color={theme.palette.primary.light} />
                )}
              </StyledVolumeCta>
            </StyledVolumeContainer>
            <StyledTooltip>
              <StyledCloseIconCta
                onClick={() => {
                  dispatch(updateShowHelpTooltip(false));
                  dispatch(updateCurrentRuleIndex(0));
                }}
              >
                <CloseIcon color={theme.palette.primary.light} size={33} />
              </StyledCloseIconCta>
              <StyledNavContainer>
                <StyledIconCta
                  disabled={_current_rule_index == 0}
                  onClick={() => {
                    dispatch(updateCurrentRuleIndex(_current_rule_index - 1));
                  }}
                >
                  <PrevIcon color={theme.palette.primary.light} size={33} />
                </StyledIconCta>
                <StyledIconCta
                  disabled={_current_rule_index == 7}
                  onClick={() => {
                    dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
                  }}
                >
                  <NextIcon color={theme.palette.primary.light} size={33} />
                </StyledIconCta>
              </StyledNavContainer>
              <StyledTooltipHeader>
                {_help_tooltip_text && _help_tooltip_text[0]}
              </StyledTooltipHeader>
              <StyledTooltipPara>
                {_help_tooltip_text && _help_tooltip_text[1]}
              </StyledTooltipPara>
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
