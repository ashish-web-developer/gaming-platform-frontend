// mui
import { Box, Input } from "@mui/material";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

// styled
import styled from "styled-components";

// icons
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface IStyledContainerItem {
  $flexBasis: string | number;
  $flexGrow: number;
}

const StyledContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #212328;
  padding: 20px 20px 0px 20px;
  display: flex;
  gap: 60px;
  @media (max-width: 600px) {
    padding: 15;
  }
`;

const StyledContainerItem = styled(Box)<IStyledContainerItem>`
  flex-basis: ${(props) => props.$flexBasis};
  flex-grow: ${(props) => props.$flexGrow};
  position:relative;
`;
const StyledChatContainer = styled(Box)`
  width: 100%;
  font-size: 24px;
  color: #fff;
  height: 100%;
  position: relative;
`;

const StyledChatContainerName = styled.h6`
  font-family: "Poppins", sans-serif;
`;

const StyledChatWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`;
const StyledChatInput = styled(Input)`
  color: #fff;
  font-weight: 400;
  position: absolute;
  bottom: 10px;
`;

const StyledEmojiIcon = styled(EmojiEmotionsIcon)`
  color:#fff;
`

const StyledSendIcon = styled(SendIcon)`
  color: #fff;
`;

const StyledEmojiPicker = styled(EmojiPicker)`
  position:absolute;
  z-index:10;
  bottom:60px;
`

export {
  StyledContainer,
  StyledContainerItem,
  StyledChatContainer,
  StyledChatContainerName,
  StyledChatWrapper,
  StyledChatInput,
  StyledSendIcon,
  StyledEmojiIcon,
  StyledEmojiPicker
};
