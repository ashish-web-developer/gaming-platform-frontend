import { useContext, useEffect, useRef } from "react";
// type
import type { ComponentType } from "react";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  help_tooltip,
  updatePlayHelpTooltipAudio,
  updateShowHelpTooltip,
  updateCurrentRuleIndex,
} from "@/store/slice/cognimatch.slice";

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
    const { play_audio, show_tooltip, tooltip_text, current_rule_index } =
      useAppSelector(help_tooltip);
    const voiceRef = useRef<{ voice: SpeechSynthesisVoice[] }>({
      voice: [],
    });

    const handlePlayAudio = () => {
      dispatch(updatePlayHelpTooltipAudio(!play_audio));
    };

    const closeHelpTooltip = () => {
      dispatch(updatePlayHelpTooltipAudio(true));
      dispatch(updateShowHelpTooltip(false));
      dispatch(updateCurrentRuleIndex(0));
    };

    const updateRuleIndex = (index: number) => {
      dispatch(updateCurrentRuleIndex(index));
    };

    useEffect(() => {
      const handleEnd = () => {
        if (current_rule_index < 7) {
          dispatch(updateCurrentRuleIndex(current_rule_index + 1));
          return;
        }
        dispatch(updateShowHelpTooltip(false));
        dispatch(updateCurrentRuleIndex(0));
      };
      if (show_tooltip && tooltip_text && SpeechUttrance && play_audio) {
        SpeechUttrance.text = tooltip_text[1];
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
    }, [show_tooltip, current_rule_index, play_audio, SpeechUttrance]);

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
    if (show_tooltip) {
      return (
        <BaseComponent
          is_open={show_tooltip}
          play_audio={play_audio}
          help_tooltip_text={tooltip_text}
          current_rule_index={current_rule_index}
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
