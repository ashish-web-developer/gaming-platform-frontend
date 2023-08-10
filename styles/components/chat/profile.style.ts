import styled from "styled-components";
import { Box, Paper } from "@mui/material";
import Colors from "@/types/data/colors";

interface IStyledProfileContainer {
  $width: number;
  $height: number;
  $backgroundColor: string;
}

interface IStyledAvatarContainer {
  $color: Colors[number];
  $width: number;
  $height: number;
}

interface IStyledProfileAvatar {
  $width: number;
  $height: number;
}

const StyledProfileContainer = styled(Paper)<IStyledProfileContainer>`
  width: 100%;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledAvatarContainer = styled(Box)<IStyledAvatarContainer>`
  width: ${(props) => props.$width * 1.1}px;
  height: ${(props) => props.$height * 1.1}px;
  background-color: ${(props) => props.$color["background-color"]};
  background-image: ${(props) => props.$color["background-image"]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const StyledProfileAvatar = styled.div<IStyledProfileAvatar>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

const StyledAvatarName = styled.h3`
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

export {
  StyledProfileContainer,
  StyledAvatarContainer,
  StyledProfileAvatar,
  StyledAvatarName,
};
