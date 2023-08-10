import { useEffect, useState } from "react";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";

// hooks
import useAvatar from "@/hooks/profile";

// styled component
import {
  StyledProfileContainer,
  StyledProfileAvatar,
  StyledAvatarContainer,
  StyledAvatarName,
} from "@/styles/components/chat/profile.style";

// mui
import { Grid, useMediaQuery, useTheme } from "@mui/material";

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

interface Props {
  colors: Colors;
  width: number;
  height: number;
  backgroundColor: string;
  user: User;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [elevation, setElevation] = useState<number>(0);
  const dispatch = useAppDispatch();
  const avatar = useAvatar(user.username ?? "");
  const color = useColor(colors);
  const background = useBackground(backgroundColor, user);

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
          <StyledAvatarContainer $color={color} $width={width} $height={height}>
            <StyledProfileAvatar
              $width={width}
              $height={height}
              dangerouslySetInnerHTML={{ __html: avatar }}
            ></StyledProfileAvatar>
          </StyledAvatarContainer>
        </Grid>
        <Grid item xs={9}>
          <StyledAvatarName>{user.name}</StyledAvatarName>
          <StyledAvatarName>@{user.username}</StyledAvatarName>
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
  const [background, setBackground] = useState(backgroundColor);
  const _active_user = useAppSelector(active_user);
  useEffect(() => {
    if (user.id == _active_user?.id) {
      setBackground("#131821");
    } else {
      setBackground(backgroundColor);
    }
  }, [_active_user]);
  return background;
};

export default Profile;
