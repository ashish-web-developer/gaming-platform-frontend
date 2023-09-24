import styled from "styled-components";
import Image from "next/image";

// mui
import { Input } from "@mui/material";

// icons
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

type IStyledChatsContainer = {
  $justifyContent: "flex-end" | "flex-start";
};

type IStyledChat = {
  $backgroundColor: "#329F5B" | "#FF934F";
  $borderRadius: "0px 10px 10px 10px" | "10px 0px 10px 10px;";
  $order: 1 | 2;
};

type IStyledChatAvatar = {
  $order?: 1 | 2;
};

const StyledChatContainer = styled.div`
  position: relative;
  width: 412px;
  height: 100%;
  border-radius: 25px;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 3;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 90%;
  }
`;

const StyledTopBackground = styled.div`
  width: 100%;
  height: 114px;
  position: absolute;
  top: 0px;
  z-index: 3;
  background: url("/memory-game/chat/background.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const StyledCenteredBackground = styled.div`
  width: 112px;
  height: 112px;
  background: #f65be3;
  filter: blur(100px);
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledChatAvatar = styled.div<IStyledChatAvatar>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 3px solid #000;
  order: ${(props) => props.$order ?? 0};
`;

const StyledVersusContainer = styled.div`
  height: 38px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    height: 23px;
  }
`;

const StyledVersusImage = styled(Image)`
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 25px;
    height: 25px;
  }
`;

const StyledVersusText = styled.span`
  color: ${({ theme }) => theme.palette.primary.info};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  flex: 1;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const StyledChatContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px 24px;
`;

const StyledChatContentContainer = styled.div`
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width of the scrollbar as needed */
  }
  &::-webkit-scrollbar:horizontal {
    height: 0px; /* Adjust this value to change the horizontal scrollbar width */
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) =>
      theme.palette.primary
        .main}; /* Change this to the desired background color */
  }
  /* Change the color of the scrollbar thumb (draggable part) */
  &::-webkit-scrollbar-thumb:vertical {
    background-color: ${({ theme }) =>
      theme.palette.secondary
        .info}; /* Change this to the desired thumb color */
    border-radius: 6px; /* Round the corners of the thumb */
  }
  padding-top: 100px;
`;

const StyledChatsContainer = styled.div<IStyledChatsContainer>`
  display: flex;
  justify-content: ${(props) => props.$justifyContent};
  align-items: flex-start;
  gap: 10px;
`;

const StyledChat = styled.div<IStyledChat>`
  max-width: 155px;
  height: auto;
  background: ${(prop) => prop.$backgroundColor};
  border-radius: ${(prop) => prop.$borderRadius};
  padding: 12px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  order: ${(props) => props.$order ?? 0};
`;

const StyledChatInputContainer = styled.div`
  flex-basis: 52px;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledChatInput = styled(Input)`
  border: 2px solid #8d8181;
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.primary.info};
  padding: 4px 10px;
`;

const StyledSendIcon = styled(SendIcon)`
  color: ${({ theme }) => theme.palette.secondary.info};
  font-size: 30px;
`;

const StyledEmojiIcon = styled(EmojiEmotionsOutlinedIcon)`
  color: ${({ theme }) => theme.palette.secondary.info};
  font-size: 30px;
  flex-basis: 40px;
  flex-shrink: 0;
`;

const StyledEmojiPicker = styled(EmojiPicker)`
  position: absolute;
  z-index: 4;
  bottom: 80px;
  right: 0px;
`;

export {
  StyledChatContainer,
  StyledTopBackground,
  StyledCenteredBackground,
  StyledChatAvatar,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledChatContent,
  StyledChatContentContainer,
  StyledChatInputContainer,
  StyledChatInput,
  StyledSendIcon,
  StyledEmojiIcon,
  StyledChatsContainer,
  StyledChat,
  StyledEmojiPicker,
};
