// mui
import { Box, Input, Button } from "@mui/material";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

// styled
import styled from "styled-components";

// icons
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

interface IStyledContainerItem {
  $flexBasis?: string | number;
  $flexGrow?: number;
}

interface IStyledChatItem extends IStyledContainerItem {
  $isFlex: boolean;
  $flexDirection?: string;
  $padding?: string;
  $flexShrink?: number;
  $justifyContent?: string;
  $alignItems?: string;
}

type IStyledChatContainerName = {
  $fontSize: string;
  $color: string;
};

type IStyledChatWrapper = {
  $alignSelf: string;
  $flexDirection: string;
};

type IStyledChat = {
  $backgroundColor: string;
  $borderRadius: string;
  $flexBasis: string;
};

type IStyledAvatar = {
  $flexBasis: string;
};
const StyledContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  gap: 60px;
  @media (max-width: 600px) {
    padding: 0;
    display: block;
  }
`;

const StyledContainerItem = styled(Box)<IStyledContainerItem>`
  flex-basis: ${(props) => props.$flexBasis ?? "auto"};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  display: flex;
  flex-direction: column;
`;

const StyledChatItem = styled.div<IStyledChatItem>`
  flex-basis: ${(props) => props.$flexBasis ?? "auto"};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  flex-shrink: ${(props) => props.$flexShrink ?? 1};
  padding: ${(props) => props.$padding ?? 0};
  overflow: scroll;
  scroll: hidden;
  ${(props) =>
    props.$isFlex &&
    `
    display:flex;
    flex-direction:${props.$flexDirection};
    justify-content:${props.$justifyContent ?? "flex-start"};
    align-items:${props.$alignItems ?? "flex-start"};
    gap:20px;
  `}
`;

const StyledChatContainerName = styled.h6<IStyledChatContainerName>`
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => props.$fontSize};
  color: ${(props) => props.$color};
`;

const StyledChatWrapper = styled.div<IStyledChatWrapper>`
  display: flex;
  gap: 10px;
  align-self: ${(props) => props.$alignSelf};
  flex-direction: ${(props) => props.$flexDirection};
  align-items: flex-end;
`;

const StyledChat = styled.div<IStyledChat>`
  max-width: 250px;
  background-color: ${(props) => props.$backgroundColor};
  padding: 10px;
  border-radius: ${(props) => props.$borderRadius};
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  flex-basis: ${(props) => props.$flexBasis};
`;

const StyledAvatar = styled.div<IStyledAvatar>`
  flex-basis: ${(props) => props.$flexBasis};
`;

const StyledChatInput = styled(Input)`
  color: ${({ theme }) => theme.palette.text.main};
  font-weight: 400;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: 6px 10px;
  border: 2px solid ${({ theme }) => theme.palette.border.searchbar};
  border-radius: 10px;
  height: 100%;
`;

const StyledEmojiIcon = styled(EmojiEmotionsOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.light};
`;

const StyledAudioIcon = styled(KeyboardVoiceOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.light};
  font-size: 28px;
  flex-basis: 25px;
`;

const StyledSendIcon = styled(SendIcon)`
  color: ${({ theme }) => theme.palette.text.main};
  font-size: 30px;
`;
const StyledPlayButton = styled(Button)`
    &.MuiButton-root {
      color: ${({ theme }) => theme.palette.text.main};
      background-color: ${({ theme }) => theme.palette.primary.light};
      font-size: 14px;
      font-family: "Rubik Moonrocks", cursive;
      border-radius: 8px;
      flex-basis: 145px;
      flex-shrink: 0;
      height: 100%;
      &:hover {
        background-color: ${({ theme }) => theme.palette.primary.light};
      }
    }
`;

const StyledEmojiPicker = styled(EmojiPicker)`
  position: absolute;
  z-index: 10;
  bottom: 110px;
`;

export {
  StyledContainer,
  StyledContainerItem,
  StyledChatItem,
  StyledChatContainerName,
  StyledChatWrapper,
  StyledChat,
  StyledAvatar,
  StyledChatInput,
  StyledSendIcon,
  StyledPlayButton,
  StyledEmojiIcon,
  StyledAudioIcon,
  StyledEmojiPicker,
};
