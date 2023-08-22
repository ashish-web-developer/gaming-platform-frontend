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
} from "@/styles/components/game/invitation-snackbar.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  gaming_user,
  show_invitation_snackbar,
  acceptInvitation,
} from "@/store/slice/game.slice";

// package

const InvitationSnackbar: FC<{
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}> = ({ vertical, horizontal }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _gaming_user = useAppSelector(gaming_user);
  const _show_invitation_snackbar = useAppSelector(show_invitation_snackbar);

  return (
    <MuiSnackbar
      open={_show_invitation_snackbar}
      anchorOrigin={{ vertical, horizontal }}
    >
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
                dispatch(acceptInvitation({ is_accepted: true }));
                router.push("/memory-game");
              }}
            >
              Accept
            </StyledButton>
            <StyledButton
              onClick={() => dispatch(acceptInvitation({ is_accepted: false }))}
            >
              Deny
            </StyledButton>
          </StyledButtonContainer>
        </StyledSnackbarContainerItem>
      </StyledSnackbarContainer>
    </MuiSnackbar>
  );
};

export default InvitationSnackbar;
