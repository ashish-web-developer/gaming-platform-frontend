import styled from "styled-components";
// mui
import { Paper, Button } from "@mui/material";

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
  &.MuiPaper-root{
    background-color: ${({ theme }) => theme.palette.primary.light};
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    padding: 10px 10px;
    width: 400px;
  }
`;

const StyledSnackbarContainerItem = styled.div<IStyledSnackbarContainerItem>`
  flex-basis: ${(props) => props.$flexBasis ?? "auto"};
  flex-grow: ${(props) => props.$flexGrow ?? 0};
  flex-shrink: ${(props) => props.$flexShrink ?? 1};
`;

const SnackbarText = styled.div<ISnackbarText>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  font-family: "Poppins", sans-serif;
  padding-bottom: 10px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root{
    color: ${({ theme }) => theme.palette.primary.light};
    background-color: ${({ theme }) => theme.palette.chat.main};
    font-size: 12px;
    font-family: "Rubik Moonrocks", cursive;
    padding: 6px 10px;
    border-radius: 8px;
    height: 100%;
    &:hover {
      background-color: ${({ theme }) => theme.palette.chat.main};
    }
  }
`;

export {
  StyledSnackbarContainer,
  StyledSnackbarContainerItem,
  SnackbarText,
  StyledButtonContainer,
  StyledButton,
};
