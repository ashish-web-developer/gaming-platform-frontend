// local components
import { Paper } from "@mui/material";
// styled
import styled from "styled-components";

type IStyledSnackbarContainerItem = {
  $flexBasis?: string;
  $flexShrink?: number;
  $flexGrow?: number;
};

type ISnackbarText = {
  $color: string;
  $fontSize: string;
};

const StyledSnackbarContainer = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px 10px;
  width: 400px;
`;

const StyledSnackbarContainerItem = styled.div<IStyledSnackbarContainerItem>`
  flex-basis: ${(props) => props.$flexBasis ?? "auto"};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  flex-shrink: ${(props) => props.$flexShrink ?? 1};
`;

const StyledSnackbarText = styled.div<ISnackbarText>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  font-family: "Rubik Moonrocks", cursive;
  padding-bottom: 10px;
`;
export {
  StyledSnackbarContainer,
  StyledSnackbarContainerItem,
  StyledSnackbarText,
};
