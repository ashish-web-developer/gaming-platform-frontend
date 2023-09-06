
import Image from "next/image";
// styled
import styled from "styled-components";

// mui
import { IconButton } from "@mui/material";

const StyledAudioPlayContainer = styled.div`
  position: absolute;
  top: 40px;
`;

const StyledAudioPlayBackground = styled.div`
  background: url("/memory-game/audio-play/audio-modal-background.png");
  background-repeat:no-repeat;
  background-size:cover;
  width: 500px;
  height: 130px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transform: rotate(-3deg);
`;

const StyledAudioPlayModal = styled.div`
  width: 500px;
  height: 130px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #000;
  transform: rotate(3deg);
  background: url("/memory-game/audio-play/background.png"), #000;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  position: relative;
  padding-right:30px;
`;

const StyledAudioPlayImage = styled(Image)`
  position: absolute;
  bottom: 0px;
`;

const StyledAudioPlayModalContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 120px;
  gap:10px;
`;

const StyledAudioPlayText = styled.p`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledPlayButton = styled(IconButton)`
  width: 60px;
  height: 60px;
  background-color: #ff2400;
  box-shadow: 0px 2px 4px #bb9f9f;
  border-radius:50%;
  &:hover{
    background-color: #ff2400;
  }
`;

export {
  StyledAudioPlayContainer,
  StyledAudioPlayBackground,
  StyledAudioPlayModal,
  StyledAudioPlayImage,
  StyledAudioPlayModalContent,
  StyledAudioPlayText,
  StyledPlayButton
};