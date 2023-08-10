import styled from "styled-components";

// Mui
import { Paper } from "@mui/material";

type IStyledChatParentContainer = {
  $align: string;
  $flexDirection: "row" | "row-reverse";
};

const StyledChatParentContainer = styled.div<IStyledChatParentContainer>`
  align-self: ${(props) => props.$align};
  width: 500px;
  display: flex;
  flex-direction: ${(props) => props.$flexDirection};
  align-items: flex-end;
  gap: 20px;
`;

const StyledChatMessageContainer = styled(Paper)`
  background-color: #2e333d;
  border-radius: 10px 10px 10px 0px;
  flex-grow: 1;
  color: #dcdcdf;
  padding: 8px;
  @media (max-width: 600px) {
    width: 100%;
  }
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
  StyledChatParentContainer,
  StyledChatMessageContainer,
  StyledChatMessageUserName,
  StyledChatMessage,
  StyledChatBottom,
  StyledChatTime,
};
