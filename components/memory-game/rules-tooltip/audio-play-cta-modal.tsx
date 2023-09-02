// react
import {useRef,useContext} from "react";
// mui 
import { Modal } from "@mui/material";

// local components
import {
  StyledModal,
  StyledImage,
  StyledText,
  StyledCta,
} from "@/styles/components/memory-game/rules-tooltip/audio-play-cta-modal.style";

// icon
import AudioTriangleIcon from "./audio-triangle-icon";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  show_audio_play_modal,
  game_rules_list,
  rules_tooltip_text,
  current_rule_index,
  updateShowAudioPlayModal,
  updateGameRules,
  updateCurrentRuleIndex
} from "@/store/slice/memory-game.slice";


// context
import { UttranceContext } from "context";

const AudioPlayCtaModal = () => {
  const SpeechUttrance = useContext(UttranceContext)
  const dispatch = useAppDispatch();
  const _game_rules_list = useAppSelector(game_rules_list);
  const _show_audio_play_modal = useAppSelector(show_audio_play_modal);
  const _rules_tooltip_text = useAppSelector(rules_tooltip_text);
  const _current_rule_index = useAppSelector(current_rule_index);
  const handleClick = () =>{
    dispatch(updateCurrentRuleIndex(0));
    dispatch(updateShowAudioPlayModal(false));
  }

  return (
    <Modal open={_show_audio_play_modal}>
      <StyledModal 
      >
        <StyledImage src="/memory-game/rules-tooltip/audio-play-cta-modal/audio-girl.svg" />
        <StyledText>
          <span
            style={{
              color: "#FF3942",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            Well, hello gorgeous!
          </span>{" "}
          🔥🎵 Ready to ignite the audio? 💃💫 Click that button for an audio
          adventure that'll send shivers down your spine. 🔊🎶 Let's make magic
          happen! 😉💖
        </StyledText>
        <StyledCta
          onClick={handleClick}
        >
          <AudioTriangleIcon />
        </StyledCta>
      </StyledModal>
    </Modal>
  );
};
export default AudioPlayCtaModal;
