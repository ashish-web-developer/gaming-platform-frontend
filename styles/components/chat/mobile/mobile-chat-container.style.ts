import styled from "styled-components";

// icons
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SettingsVoiceOutlinedIcon from "@mui/icons-material/SettingsVoiceOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";
// mui
import { Input } from "@mui/material";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

type IStyledChatWrapper = {
  $alignSelf: string;
  $flexDirection: string;
};

type IStyledChatWrapperItem = {
  $flexBasis: string;
};

interface IStyledChat extends IStyledChatWrapperItem {
  $backgroundColor: string;
  $borderRadius: string;
}
const StyledChatContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: scroll;
  padding: 16px;
`;

const StyledChatWrapper = styled.div<IStyledChatWrapper>`
  display: flex;
  gap: 10px;
  align-self: ${(props) => props.$alignSelf};
  flex-direction: ${(props) => props.$flexDirection};
  align-items: flex-end;
`;

const StyledAvatar = styled.div<IStyledChatWrapperItem>`
  flex-basis: ${(props) => props.$flexBasis};
`;

const StyledChat = styled.div<IStyledChat>`
  max-width: 200px;
  background-color: ${(props) => props.$backgroundColor};
  padding: 10px;
  border-radius: ${(props) => props.$borderRadius};
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  flex-basis: ${(props) => props.$flexBasis};
`;

const StyledChatInputContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  gap: 10px;
`;

const StyledAudioIcon = styled(KeyboardVoiceOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.light};
  font-size: 24px;
  flex-basis: 20px;
`;

const StyledAudioPlayingIcon = styled(SettingsVoiceOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.light};
  font-size: 24px;
  flex-basis: 20px;
`;

const StyledEmojiIcon = styled(EmojiEmotionsOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.light};
  font-size: 24px;
  flex-basis: 20px;
`;

const StyledSendIcon = styled(SendIcon)`
  color: ${({ theme }) => theme.palette.text.main};
  font-size: 24px;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: 10px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.palette.border.searchbar};
`;

const StyledEmojiPicker = styled(EmojiPicker)`
  position: absolute;
  bottom: 100px;
`;

export {
  StyledChatContainer,
  StyledChatWrapper,
  StyledAvatar,
  StyledChat,
  StyledChatInputContainer,
  StyledAudioIcon,
  StyledEmojiIcon,
  StyledSendIcon,
  StyledAudioPlayingIcon,
  StyledInput,
  StyledEmojiPicker,
};
