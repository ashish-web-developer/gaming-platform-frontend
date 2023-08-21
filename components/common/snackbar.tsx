import type { FC } from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

// styled theme
import { useTheme } from "styled-components";

// styled components
import {
  StyledSnackbarContainer,
  StyledSnackbarContainerItem,
  SnackbarText,
  StyledButtonContainer,
  StyledButton,
} from "@/styles/components/common/snackbar.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  updateGamingUser,
  gaming_user,
  show_snackbar,
  updateShowSnackbar,
  updateRoomId,
} from "@/store/slice/memory-game.slice";

// package
import { Axios } from "@/helpers/axios";

const Snackbar: FC<{
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}> = ({ vertical, horizontal }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _gaming_user = useAppSelector(gaming_user);
  const _show_snackbar = useAppSelector(show_snackbar);

  const handleAccept = async (is_accepted: boolean) => {
    await Axios.post("/game/accept-invitation", {
      receiver_id: _gaming_user?.id,
      is_accepted,
    });
    if (is_accepted) {
      router.push("/memory-game");
    } else {
      dispatch(updateRoomId(null));
    }
  };
  return (
    <MuiSnackbar open={_show_snackbar} anchorOrigin={{ vertical, horizontal }}>
      <StyledSnackbarContainer elevation={2}>
        <StyledSnackbarContainerItem $flexBasis="100px">
          <Image alt="gaming" width={70} height={70} src="/gaming.png" />
        </StyledSnackbarContainerItem>
        <StyledSnackbarContainerItem $flexGrow={1}>
          <SnackbarText $fontSize="14px" $color={theme.palette.text.main}>
            Hi, You have got an Invitation from {_gaming_user?.name} for Memory
            Game.
          </SnackbarText>
          <StyledButtonContainer>
            <StyledButton
              onClick={() => {
                handleAccept(true);
                dispatch(updateShowSnackbar(false));
              }}
            >
              Accept
            </StyledButton>
            <StyledButton
              onClick={() => {
                handleAccept(false);
                dispatch(updateGamingUser(null));
                dispatch(updateShowSnackbar(false));
              }}
            >
              Deny
            </StyledButton>
          </StyledButtonContainer>
        </StyledSnackbarContainerItem>
      </StyledSnackbarContainer>
    </MuiSnackbar>
  );
};

export default Snackbar;
