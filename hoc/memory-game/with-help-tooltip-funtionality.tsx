import { useContext, useEffect, useRef } from "react";
// type
import type { ComponentType } from "react";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  play_audio,
  show_help_tooltip,
  help_tooltip_text,
  current_rule_index,
  updateCurrentRuleIndex,
  updateShowHelpTooltip,
  updatePlayAudio,
} from "@/store/slice/memory-game.slice";

// context
import { UttranceContext } from "context";

type IBaseProps = {
  is_open: boolean;
  play_audio: boolean;
  help_tooltip_text: [string, string] | null;
  current_rule_index: number;
  handlePlayAudio: () => void;
  closeHelpTooltip: () => void;
  updateRuleIndex: (index: number) => void;
};

const withHelpTooltipFunctionality = (
  BaseComponent: ComponentType<IBaseProps>
) => {
  return function EnhancedComponent() {
    const dispatch = useAppDispatch();
    const SpeechUttrance = useContext(UttranceContext);
    const _play_audio = useAppSelector(play_audio);
    const _show_help_tooltip = useAppSelector(show_help_tooltip);
    const _help_tooltip_text = useAppSelector(help_tooltip_text);
    const _current_rule_index = useAppSelector(current_rule_index);
    const voiceRef = useRef<{ voice: SpeechSynthesisVoice[] }>({
      voice: [],
    });

    const handlePlayAudio = () => {
      dispatch(updatePlayAudio(!_play_audio));
    };

    const closeHelpTooltip = () => {
      dispatch(updatePlayAudio(true));
      dispatch(updateShowHelpTooltip(false));
      dispatch(updateCurrentRuleIndex(0));
    };

    const updateRuleIndex = (index: number) => {
      dispatch(updateCurrentRuleIndex(index));
    };

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
          SpeechUttrance.uttrance.voice = voiceRef.current.voice.filter(
            (voice) => voice.voiceURI.includes("Female")
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

    useEffect(() => {
      const updateVoices = () => {
        voiceRef.current.voice = speechSynthesis.getVoices();
      };
      updateVoices();
      window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
      return () => {
        window.speechSynthesis.removeEventListener(
          "voiceschanged",
          updateVoices
        );
      };
    }, []);
    if (_show_help_tooltip) {
      return (
        <BaseComponent
          is_open={_show_help_tooltip}
          play_audio={_play_audio}
          help_tooltip_text={_help_tooltip_text}
          current_rule_index={_current_rule_index}
          updateRuleIndex={updateRuleIndex}
          closeHelpTooltip={closeHelpTooltip}
          handlePlayAudio={handlePlayAudio}
        />
      );
    }
    return null;
  };
};

export default withHelpTooltipFunctionality;
