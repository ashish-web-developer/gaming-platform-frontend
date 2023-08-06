// mui
import { Box, Input } from "@mui/material";

// styled
import styled from "styled-components";

// icons
import SendIcon from "@mui/icons-material/Send";

const StyledContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #212328;
  padding: 20px 20px 0px 20px;
`;

const StyledChatContainer = styled(Box)`
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

const StyledSendIcon = styled(SendIcon)`
  color: #fff;
`;

export {
  StyledContainer,
  StyledChatContainer,
  StyledChatContainerName,
  StyledChatWrapper,
  StyledChatInput,
  StyledSendIcon,
};
