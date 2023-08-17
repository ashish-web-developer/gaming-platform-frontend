import { useState } from "react";

// types
import type { FC } from "react";
// mui
import { InputAdornment } from "@mui/material";

// local components
import Profile from "@/components/chat/profile";

// styled
import { useTheme } from "styled-components";
// styled components
import {
  StyledSearchbarContainer,
  StyledSearchbar,
  StyledTextField,
  StyledSearchIcon,
  StyledPaperComponent,
} from "@/styles/components/chat/chat-searchbar.style";

// helpers

import { v4 as uuidv4 } from "uuid";

// redux
import { useSearchedUserOptions } from "@/hooks/chat";

const CustomPaperComponent = (props: any) => {
  return <StyledPaperComponent {...props} elevation={8} />;
};

const ChatSearchbar: FC = () => {
  const theme = useTheme();
  const [searchedInputValue, setSearchedInputValue] = useState<string | null>(
    null
  );
  const [options, setOptions] = useSearchedUserOptions(searchedInputValue);
  return (
    <StyledSearchbarContainer>
      <StyledSearchbar
        disablePortal
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option: any) => option.name}
        PaperComponent={CustomPaperComponent}
        onBlur={() => {
          setOptions([]);
        }}
        renderOption={(props, option: any) => {
          return (
            <Profile
              key={uuidv4()}
              user={option}
              width={50}
              height={50}
              backgroundColor={theme.palette.primary.light}
              isSearch={true}
              disableElevation={false}
            />
          );
        }}
        renderInput={(params) => {
          return (
            <StyledTextField
              sx={{
                "& fieldset": { border: "none" },
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
  );
};

export default ChatSearchbar;
