import styled from "styled-components";

// types
import type Colors from "@/types/data/colors";
// mui
import { Box } from "@mui/material";

interface IStyledAvatarContainer {
  $color: Colors[number];
  $width: number;
  $height: number;
}

interface IStyledProfileAvatar {
  $width: number;
  $height: number;
}

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

export { StyledAvatarContainer, StyledProfileAvatar };
