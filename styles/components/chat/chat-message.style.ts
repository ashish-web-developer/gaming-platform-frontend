import styled from "styled-components";

// Mui
import { Paper } from "@mui/material";

type StyledChatMessageContainerProps = {
  $align: string;
};

const StyledChatMessageContainer = styled(
  Paper
)<StyledChatMessageContainerProps>`
  background-color: #2e333d;
  border-radius: 10px 10px 10px 0px;
  width: 400px;
  color: #dcdcdf;
  padding: 8px;
  align-self: ${(props) => props.$align};
`;

const StyledChatMessageUserName = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
`;

const StyledChatMessage = styled.div`
  padding: 6px 0px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
`;

const StyledChatBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledChatTime = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #959495;
`;

export {
  StyledChatMessageContainer,
  StyledChatMessageUserName,
  StyledChatMessage,
  StyledChatBottom,
  StyledChatTime,
};
