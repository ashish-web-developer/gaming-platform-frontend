import { useEffect, useState } from "react";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";

// hooks
import useAvatar from "@/hooks/profile";
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
  updateMobileNavigation,
} from "@/store/slice/chat.slice";
import type { Conversation } from "@/types/store/slice/chat";

interface ChatUser extends User {
  received_messages: Conversation[];
  sent_messages: Conversation[];
}

interface Props {
  colors: Colors;
  width: number;
  height: number;
  backgroundColor: string;
  user: ChatUser;
  isSearch?: boolean;
  disableElevation?: boolean;
}

const Profile: FC<Props> = ({
  colors,
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
  const avatar = useAvatar(user.username ?? "");
  const color = useColor(colors);
  const background = useBackground(backgroundColor, user);

  const getLastConversation = () => {
    let conversation = [...user.received_messages, ...user.sent_messages];
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
      dispatch(updateMobileNavigation(0));
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
            color={color}
            width={width}
            height={height}
            avatar={avatar}
          />
        </Grid>
        <Grid item xs={9}>
          <StyledAvatarName $fontSize="14px">{user.name}</StyledAvatarName>
          <StyledAvatarName $fontSize="12px">@{user.username}</StyledAvatarName>
          <StyledLastConversation>
            {user.received_messages
              ? getLastConversation().message
              : "Say Hello"}
          </StyledLastConversation>
        </Grid>
      </Grid>
    </StyledProfileContainer>
  );
};

const useColor = (colors: Colors) => {
  const colorsLength = colors.length;
  return colors[Math.floor(Math.random() * colorsLength)];
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
