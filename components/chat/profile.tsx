import { useState } from "react";

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
import { Grid } from "@mui/material";

// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateUsersList, updateActiveUser } from "@/store/slice/chat.slice";

interface Props {
  colors: Colors;
  width: number;
  height: number;
  user: User;
  isSearch?: boolean;
}

const Profile: FC<Props> = ({
  colors,
  width,
  height,
  user,
  isSearch = false,
}) => {
  const [elevation, setElevation] = useState<number>(0);
  const dispatch = useAppDispatch();
  const avatar = useAvatar(user.username ?? "");
  const color = useColor(colors);

  const handleOnClick = () => {
    if (isSearch) {
      dispatch(updateUsersList(user));
      return;
    }
    dispatch(updateActiveUser(user));
  };
  return (
    <StyledProfileContainer
      onMouseEnter={() => setElevation(8)}
      onMouseLeave={() => setElevation(0)}
      elevation={elevation}
      onClick={() => handleOnClick()}
      $width={width}
      $height={height}
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

export default Profile;
