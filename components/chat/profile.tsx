import { useEffect, useState } from "react";

// types
import type { FC } from "react";
import type { User } from "@/types/user";
import type { ChatUser } from "@/types/store/slice/chat";

// styled
import { useTheme } from "styled-components";
// styled component
import {
  StyledProfileContainer,
  StyledAvatarName,
  StyledLastConversation,
} from "@/styles/components/chat/profile.style";
// local components
import ChatAvatar from "@/components/chat/chat-avatar";

// mui
import { Grid, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";

// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  //state
  active_user,
  //actions
  updateUsersList,
  updateActiveUser,
  updateShowChat,
} from "@/store/slice/chat.slice";

interface Props {
  width: number;
  height: number;
  backgroundColor: string;
  user: ChatUser;
  isSearch?: boolean;
  disableElevation?: boolean;
}

const Profile: FC<Props> = ({
  width,
  height,
  backgroundColor,
  user,
  isSearch = false,
  disableElevation = false,
}) => {
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [elevation, setElevation] = useState<number>(0);
  const dispatch = useAppDispatch();
  const background = useBackground(backgroundColor, user);

  const getLastConversation = () => {
    let conversation = [
      ...(user.received_messages ? user.received_messages : []),
      ...(user.sent_messages ? user.sent_messages : []),
    ];
    conversation.sort((conversation1, conversation2) => {
      const date1 = new Date(conversation1.created_at);
      const date2 = new Date(conversation2.created_at);
      return date2.getTime() - date1.getTime();
    });
    return conversation[0];
  };

  const handleOnClick = () => {
    if (isSearch) {
      dispatch(updateUsersList(user));
      return;
    }
    dispatch(updateActiveUser(user));
    if (isMobile) {
      dispatch(updateShowChat(true));
    }
  };
  return (
    <StyledProfileContainer
      onMouseEnter={() => {
        if (disableElevation) {
          return;
        }
        setElevation(8);
      }}
      onMouseLeave={() => {
        if (disableElevation) {
          return;
        }
        setElevation(0);
      }}
      elevation={elevation}
      onClick={() => handleOnClick()}
      $width={width}
      $height={height}
      $backgroundColor={background}
    >
      <Grid container>
        <Grid item xs={3}>
          <ChatAvatar
            width={width}
            height={height}
            username={user.username as string}
          />
        </Grid>
        <Grid item xs={9}>
          <StyledAvatarName $fontSize="14px">{user.name}</StyledAvatarName>
          <StyledAvatarName $fontSize="12px">@{user.username}</StyledAvatarName>
          <StyledLastConversation>
            {getLastConversation()?.message ?? "Say Hello"}
          </StyledLastConversation>
        </Grid>
      </Grid>
    </StyledProfileContainer>
  );
};

const useBackground = (backgroundColor: string, user: User) => {
  const theme = useTheme();
  const [background, setBackground] = useState(backgroundColor);
  const _active_user = useAppSelector(active_user);
  useEffect(() => {
    if (user.id == _active_user?.id) {
      setBackground(theme.palette.primary.light);
    } else {
      setBackground(backgroundColor);
    }
  }, [_active_user]);
  return background;
};

export default Profile;
