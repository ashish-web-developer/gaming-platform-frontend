import styled from "styled-components";
// mui
import { Autocomplete, Paper, TextField, Box } from "@mui/material";

// icon
import SearchIcon from "@mui/icons-material/Search";
const StyledSearchbar = styled(Autocomplete)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 16px;
  border: 3px solid ${({ theme }) => theme.palette.border.searchbar};
  & .MuiAutocomplete-inputRoot {
    color: ${({theme})=>theme.palette.text.main} !important;
  }
`;

const StyledLabel = styled.label`
  color: #b8b4b4;
`;

const StyledTextField = styled(TextField)`
  & input::placeholder {
    color: #b8b4b4;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: #b8b4b4;
  font-size: 30px;
`;

const StyledPaperComponent = styled(Paper)`
  background-color: ${({theme})=>theme.palette.primary.main} !important;
  padding: 12px;
  border-radius: 16px;
`;

export {
  StyledSearchbar,
  StyledTextField,
  StyledSearchIcon,
  StyledLabel,
  StyledPaperComponent,
};
