import Image from "next/image";
import { useContext, useEffect } from "react";
// types
import { type FC } from "react";
// mui
import { Drawer } from "@mui/material";

// styled components
import {
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

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
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

// icons
import VolumeOffIcon from "../icons/volume-off";
import VolumeOnIcon from "../icons/volume-on";
import PrevIcon from "../icons/prev";
import NextIcon from "../icons/next";
import BackIcon from "../icons/back";

// context
import { UttranceContext } from "context";

const MobileHelpTooltip: FC = () => {
  const dispatch = useAppDispatch();
  const SpeechUttrance = useContext(UttranceContext);
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
      SpeechUttrance.uttrance.voice = speechSynthesis
        .getVoices()
        .filter((voice) => voice.voiceURI.includes("Female"))[0];
      speechSynthesis.speak(SpeechUttrance.uttrance);
      SpeechUttrance.uttrance.addEventListener("end", handleEnd);
    }
    return () => {
      SpeechUttrance?.uttrance.removeEventListener("end", handleEnd);
      speechSynthesis.cancel();
    };
  }, [_show_help_drawer, _current_rule_index, _play_audio]);

  return (
    <Drawer
      anchor="right"
      open={_show_help_drawer}
      onClose={() => {
        dispatch(updateShowHelpDrawer(false));
      }}
    >
      <StyledTooltipContainer>
        <StyledTopBackground>
          <Image
            layout="responsive"
            alt="girl"
            src="/memory-game/help-tooltip/mobile/top-background.svg"
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
          <StyledTrofyImage>
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
            startIcon={
              <StyledBackIconContainer>
                <BackIcon width={12} height={22} color={"#000"} />
              </StyledBackIconContainer>
            }
            variant="contained"
          >
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
              <PrevIcon size={50} color={"#000"} />
            </StyledNavCta>
            <StyledNavCta
              onClick={() => {
                if (_current_rule_index <= 6) {
                  dispatch(updateCurrentRuleIndex(_current_rule_index + 1));
                }
              }}
            >
              <NextIcon size={50} color={"#000"} />
            </StyledNavCta>
          </StyledNavIconContainer>
        </StyledBottomCta>
      </StyledTooltipContainer>
    </Drawer>
  );
};
export default MobileHelpTooltip;
