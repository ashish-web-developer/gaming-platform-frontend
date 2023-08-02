import { useEffect, useState } from "react";
// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";

// Local components
import Profile from "@/components/chat/profile";

// styled components
import {
  StyledSearchbarContainer,
  StyledTextField,
  StyledSearchIcon,
  StyledPaperComponent,
  StyledLabel,
} from "@/styles/components/chat/chat-sidebar.style";
// mui
import { InputAdornment } from "@mui/material";

// helpers
import { Axios } from "@/helpers/axios";

import { v4 as uuidv4 } from "uuid";

// Redux
import { useAppSelector } from "@/hooks/redux";
import { users } from "@/store/slice/chat.slice";

const CustomPaperComponent = (props: any) => {
  return <StyledPaperComponent {...props} elevation={8} />;
};

const ChatSidebar: FC<{ colors: Colors }> = ({ colors }) => {
  const _users = useAppSelector(users);
  const [searchedInputValue, setSearchedInputValue] = useState<string | null>(
    null
  );
  const [options, setOptions] = useState<User[]>([]);

  const handleInput = async (query: string) => {
    const res = await Axios.post("/chat/get-user", null, {
      params: {
        query,
      },
    });
    setOptions(res.data.user);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (searchedInputValue) {
      timer = setTimeout(() => {
        handleInput(searchedInputValue);
      }, 300);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchedInputValue]);
  return (
    <>
      <StyledSearchbarContainer
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
              colors={colors}
              isClickEvent={true}
            />
          );
        }}
        renderInput={(params) => {
          return (
            <StyledTextField
              label={<StyledLabel>Users</StyledLabel>}
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
      {_users.map((user) => {
        return (
          <Profile
            key={uuidv4()}
            user={user}
            width={60}
            height={60}
            colors={colors}
          />
        );
      })}
    </>
  );
};

export default ChatSidebar;
