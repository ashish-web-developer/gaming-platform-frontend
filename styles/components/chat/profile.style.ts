import styled from "styled-components";
import { Paper } from "@mui/material";

type IStyledProfileContainer = {
  $width: number;
  $height: number;
  $backgroundColor: string;
};

type IStyledAvatarName = {
  $fontSize: string;
};

const StyledProfileContainer = styled(Paper)<IStyledProfileContainer>`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledAvatarName = styled.h3<IStyledAvatarName>`
  color: ${({ theme }) => theme.palette.text.main};
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => props.$fontSize};
  font-weight: 800;
`;

const StyledLastConversation = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.light};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { StyledProfileContainer, StyledAvatarName, StyledLastConversation };
