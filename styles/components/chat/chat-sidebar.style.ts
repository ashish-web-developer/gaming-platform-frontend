import styled from "styled-components";
// mui
import { Autocomplete, Paper, TextField } from "@mui/material";

// icon
import SearchIcon from "@mui/icons-material/Search";

const StyledPaperComponent = styled(Paper)`
  background-color: #1e232c;
  padding: 12px;
  border-radius: 16px;
`;

const StyledSearchbarContainer = styled(Autocomplete)`
  background-color: #2e333d;
  border-radius: 16px;
  margin-bottom: 20px;
  & .MuiAutocomplete-inputRoot {
    color: #fff !important;
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

export {
  StyledPaperComponent,
  StyledSearchbarContainer,
  StyledTextField,
  StyledSearchIcon,
  StyledLabel,
};
