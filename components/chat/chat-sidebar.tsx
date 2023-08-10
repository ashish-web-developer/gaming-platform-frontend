import { useEffect, useState } from "react";
// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// Local components
import Profile from "@/components/chat/profile";

// styled components
import {
  StyledSidebarContainer,
  StyledSearchbarContainer,
  StyledSearchbar,
  StyledTextField,
  StyledSearchIcon,
  StyledPaperComponent,
  StyledLabel,
  StyledProfileContainer,
} from "@/styles/components/chat/chat-sidebar.style";
// mui
import { InputAdornment } from "@mui/material";

// helpers

import { v4 as uuidv4 } from "uuid";

// Redux
import { useAppSelector } from "@/hooks/redux";
import { users } from "@/store/slice/chat.slice";

// hooks
import { useSearchedUserOptions } from "@/hooks/chat";

const CustomPaperComponent = (props: any) => {
  return <StyledPaperComponent {...props} elevation={8} />;
};

const ChatSidebar: FC<{ colors: Colors }> = ({ colors }) => {
  const _users = useAppSelector(users);
  const [searchedInputValue, setSearchedInputValue] = useState<string | null>(
    null
  );
  const options = useSearchedUserOptions(searchedInputValue);

  return (
    <StyledSidebarContainer>
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
      </StyledSearchbarContainer>
      <StyledProfileContainer>
        {_users.map((user) => {
          return (
            <Profile
              key={uuidv4()}
              user={user}
              width={60}
              height={60}
              colors={colors}
              backgroundColor="#212328"
              disableElevation={true}
            />
          );
        })}
      </StyledProfileContainer>
    </StyledSidebarContainer>
  );
};

export default ChatSidebar;
