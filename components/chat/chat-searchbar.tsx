import { useEffect } from "react";

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
  StyledSearchbar,
  StyledTextField,
  StyledSearchIcon,
  StyledPaperComponent,
} from "@/styles/components/chat/chat-searchbar.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  searched_user,
  searched_input_value,
  // actions
  updateSearchedUser,
  updateSearchedInputValue,
  // api calls
  searchUserApi,
} from "@/store/slice/chat.slice";

const CustomPaperComponent = (props: any) => {
  return <StyledPaperComponent {...props} elevation={8} />;
};

const ChatSearchbar: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const _searched_user = useAppSelector(searched_user);
  const _searched_input_value = useAppSelector(searched_input_value);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (_searched_input_value) {
      timer = setTimeout(() => {
        dispatch(searchUserApi());
      }, 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [_searched_input_value]);
  return (
    <StyledSearchbar
      disablePortal
      id="combo-box-demo"
      options={_searched_user}
      getOptionLabel={(option: any) => option.name}
      fullWidth
      PaperComponent={CustomPaperComponent}
      onBlur={() => {
        dispatch(updateSearchedUser([]));
        dispatch(updateSearchedInputValue(""));
      }}
      renderOption={(props, option: any) => {
        return (
          <Profile
            key={option.id}
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
            onInput={(event: any) => {
              dispatch(updateSearchedInputValue(event.target.value));
            }}
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
  );
};

export default ChatSearchbar;
