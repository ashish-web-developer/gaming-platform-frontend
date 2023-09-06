import Image from "next/image";
// type
import type { FC } from "react";

// styled components
import {
  StyledAudioPlayContainer,
  StyledAudioPlayBackground,
  StyledAudioPlayModal,
  StyledAudioPlayImage,
  StyledAudioPlayModalContent,
  StyledAudioPlayText,
  StyledPlayButton
} from "@/styles/components/memory-game/audio-play-modal/audio-play-modal.style";
// icons
import Play from "@/components/memory-game/audio-play-modal/icons/play";

const AudioPlayModal = () => {
  return (
    <StyledAudioPlayContainer>
      <StyledAudioPlayBackground>
        <StyledAudioPlayModal>
          <StyledAudioPlayImage
            width={120}
            height={160}
            alt="girl"
            src="/memory-game/audio-play/audio-modal-girl.png"
          />
          <StyledAudioPlayModalContent>
            <StyledAudioPlayText>
              <span style = {{color:"#6D61FF", fontWeight:600}}>Darling, are you ready to turn up the heat in CogniMatch?</span> Press
              that tempting 'Audio On' button and let the seductive sounds of
              the game wash over you. It's time to immerse yourself fully in the
              experience. 🔊🎶😉
            </StyledAudioPlayText>
            <StyledPlayButton>
              <Play/>
            </StyledPlayButton>
          </StyledAudioPlayModalContent>
        </StyledAudioPlayModal>
      </StyledAudioPlayBackground>
    </StyledAudioPlayContainer>
  );
};

export default AudioPlayModal;
