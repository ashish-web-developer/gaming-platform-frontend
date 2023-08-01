import styled from "styled-components"
// mui
import { Autocomplete ,TextField} from "@mui/material"

// icon
import SearchIcon from '@mui/icons-material/Search';


const StyledSearchbarContainer = styled(Autocomplete)`
    background-color:#2e333d;
    border-radius:16px;
    margin-bottom:20px;
`

const StyledTextField = styled(TextField)`
    & input::placeholder {
        color:#b8b4b4;
    }
`

const StyledSearchIcon = styled(SearchIcon)`
    color:#b8b4b4;
    font-size:40px;
`

export {
    StyledSearchbarContainer,
    StyledTextField,
    StyledSearchIcon
}