import Image from "next/image";
import { useEffect, useContext, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// styled components
import {
  StyledTooltipDrawer,
  StyledTooltipContainer,
  StyledTopBackground,
  StyledVolumeCta,
  StyledContent,
  StyledHeader,
  StyledPara,
  StyledTrofyImage,
  StyledBottomCta,
  StyledNavIconContainer,
  StyledBackButton,
  StyledNavCta,
  StyledBackIconContainer,
} from "@/styles/components/memory-game/help-tooltip/mobile/mobile-help-tooltip.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  play_audio,
  show_help_drawer,
  help_tooltip_text,
  current_rule_index,
  // actions
  updateShowHelpDrawer,
  updatePlayAudio,
  updateCurrentRuleIndex,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// icons
import VolumeOffIcon from "@/components/memory-game/help-tooltip/icons/volume-off";
import VolumeOnIcon from "@/components/memory-game/help-tooltip/icons/volume-on";
import PrevIcon from "@/components/memory-game/help-tooltip/icons/prev";
import NextIcon from "@/components/memory-game/help-tooltip/icons/next";
import BackIcon from "@/components/memory-game/help-tooltip/icons/back";

// context
import { UttranceContext } from "context";

type IForwardedRef = {
  voice: SpeechSynthesisVoice[];
};

const MobileHelpTooltip: ForwardRefRenderFunction<IForwardedRef> = (
  props,
  voiceRef
) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const SpeechUttrance = useContext(UttranceContext);
  const _mode = useAppSelector(mode);
  const _play_audio = useAppSelector(play_audio);
  const _show_help_drawer = useAppSelector(show_help_drawer);
  const _help_tooltip_text = useAppSelector(help_tooltip_text);
  const _current_rule_index = useAppSelector(current_rule_index);

  useEffect(() => {
    const handleEnd = () => {
      if (_current_rule_index < 7) {
        dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
        return;
      }
      dispatch(updateShowHelpDrawer(false));
      dispatch(updateCurrentRuleIndex(0));
    };
    if (
      _show_help_drawer &&
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
  }, [_show_help_drawer, _current_rule_index, _play_audio]);

  return (
    <StyledTooltipDrawer open={_show_help_drawer}>
      <StyledTooltipContainer>
        <StyledTopBackground>
          <Image
            layout="responsive"
            alt="girl"
            src={"/memory-game/help-tooltip/mobile/light-top-background.svg"}
            width={390}
            height={350}
          />
        </StyledTopBackground>
        <StyledVolumeCta
          onClick={() => {
            dispatch(updatePlayAudio(!_play_audio));
          }}
        >
          {_play_audio ? (
            <VolumeOffIcon size={30} color={"#fff"} />
          ) : (
            <VolumeOnIcon size={30} color={"#fff"} />
          )}
        </StyledVolumeCta>
        <StyledContent>
          <StyledHeader>
            {_help_tooltip_text ? _help_tooltip_text[0] : ""}
          </StyledHeader>
          <StyledPara>
            {_help_tooltip_text ? _help_tooltip_text[1] : ""}
          </StyledPara>
          <StyledTrofyImage $showBackground={_mode == "light"}>
            <Image
              alt="banner"
              layout="responsive"
              width={200}
              height={283}
              src="/memory-game/help-tooltip/mobile/banner-image.png"
            />
          </StyledTrofyImage>
        </StyledContent>
        <StyledBottomCta>
          <StyledBackButton
            onClick={() => {
              dispatch(updatePlayAudio(true));
              dispatch(updateShowHelpDrawer(false));
              dispatch(updateCurrentRuleIndex(0));
            }}
          >
            <StyledBackIconContainer>
              <BackIcon
                width={12}
                height={22}
                color={theme.palette.primary.dark}
              />
            </StyledBackIconContainer>
            Go Back
          </StyledBackButton>
          <StyledNavIconContainer>
            <StyledNavCta
              onClick={() => {
                if (_current_rule_index >= 1) {
                  dispatch(updateCurrentRuleIndex(_current_rule_index - 1));
                }
              }}
            >
              <PrevIcon size={50} color={theme.palette.primary.dark} />
            </StyledNavCta>
            <StyledNavCta
              onClick={() => {
                if (_current_rule_index <= 6) {
                  dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
                }
              }}
            >
              <NextIcon size={50} color={theme.palette.primary.dark} />
            </StyledNavCta>
          </StyledNavIconContainer>
        </StyledBottomCta>
      </StyledTooltipContainer>
    </StyledTooltipDrawer>
  );
};
export default forwardRef(MobileHelpTooltip);
