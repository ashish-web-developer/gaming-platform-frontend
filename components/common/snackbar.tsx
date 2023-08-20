import type { FC } from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import Image from "next/image";

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
import { updateGamingUser, gaming_user, show_snackbar } from "@/store/slice/memory-game.slice";

const Snackbar: FC<{
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}> = ({  vertical, horizontal }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const _gaming_user = useAppSelector(gaming_user);
  const _show_snackbar = useAppSelector(show_snackbar);
  return (
    <MuiSnackbar open={_show_snackbar} anchorOrigin={{ vertical, horizontal }}>
      <StyledSnackbarContainer elevation={2}>
        <StyledSnackbarContainerItem $flexBasis="100px">
          <Image alt="gaming" width={70} height={70} src="/gaming.png" />
        </StyledSnackbarContainerItem>
        <StyledSnackbarContainerItem $flexGrow={1}>
          <SnackbarText $fontSize="14px" $color={theme.palette.text.main}>
            Hi, You have got an Invitation from {_gaming_user?.name} for Memory Game.
          </SnackbarText>
          <StyledButtonContainer>
            <StyledButton>Accept</StyledButton>
            <StyledButton
              onClick={() => {
                dispatch(updateGamingUser(null));
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
