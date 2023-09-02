import styled from "styled-components";

// local components
import AudioTriangleIcon from "@/components/memory-game/rules-tooltip/audio-triangle-icon";
// mui
import { IconButton } from "@mui/material";

// framer motion
import {motion} from "framer-motion";

const StyledModal = styled(motion.div)`
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 128px;
  border-radius: 9px;
  background: url("/memory-game/rules-tooltip/audio-play-cta-modal/audio-play-cta-modal-background.png"),
    #fbfff1;
  background-repeat:no-repeat;
  background-size:100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  outline: none;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
`;

const StyledImage = styled.img`
  position: absolute;
  bottom: 0px;
  left: -44px;
  width: 163px;
  height: 163px;
`;

const StyledText = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  margin-left: 80px;
`;

const StyledCta = styled(IconButton)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #000;
  flex-shrink: 0;
  background: url("/memory-game/rules-tooltip/audio-play-cta-modal/audio-play-cta-background.png"),
    #ad2622;
  background-repeat:no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color:#ad2622;
  }
`;

export { StyledModal, StyledImage, StyledText, StyledCta };
