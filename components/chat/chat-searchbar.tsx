import { useState } from "react";


// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
// mui
import { InputAdornment } from "@mui/material";


// local components
import Profile from "@/components/chat/profile";

// styled components
import {
  StyledSearchbarContainer,
  StyledSearchbar,
  StyledTextField,
  StyledSearchIcon,
  StyledLabel,
  StyledPaperComponent
} from "@/styles/components/chat/chat-searchbar.style"

// helpers

import { v4 as uuidv4 } from "uuid";


// redux
import { useSearchedUserOptions } from "@/hooks/chat";


const CustomPaperComponent = (props: any) => {
  return <StyledPaperComponent {...props} elevation={8} />;
};


interface Props {
    colors:Colors
}
const ChatSearchbar:FC<Props> = ({colors})=>{
    const [searchedInputValue, setSearchedInputValue] = useState<string | null>(
        null
    );
    const options = useSearchedUserOptions(searchedInputValue);
    return(
      <StyledSearchbarContainer>
        <StyledSearchbar
          disablePortal
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option: any) => option.name}
          PaperComponent={CustomPaperComponent}
          renderOption={(props, option: any) => {
            return (
              <Profile
                key={uuidv4()}
                user={option}
                width={50}
                height={50}
                backgroundColor="#131821"
                colors={colors}
                isSearch={true}
                disableElevation={false}
              />
            );
          }}
          renderInput={(params) => {
            return (
              <StyledTextField
                sx={{
                "& fieldset": { border: 'none' },
                }}
                placeholder="Search"
                onInput={(event: any) =>
                  setSearchedInputValue(event.target.value)
                }
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <StyledSearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
      </StyledSearchbarContainer>
    )

}

export default ChatSearchbar;