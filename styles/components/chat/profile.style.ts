import styled from "styled-components";
import { Paper } from "@mui/material";

interface IStyledProfileContainer {
  $width: number;
  $height: number;
  $backgroundColor: string;
}

const StyledProfileContainer = styled(Paper)<IStyledProfileContainer>`
  width: 100%;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledAvatarName = styled.h3`
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

export { StyledProfileContainer, StyledAvatarName };
