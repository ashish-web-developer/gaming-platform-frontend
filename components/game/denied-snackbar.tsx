import Image from "next/image";
// type
import type { FC } from "react";
// local components
import { Snackbar } from "@mui/material";

// styled theme
import { useTheme } from "styled-components";

// styled components
import {
  StyledSnackbarContainer,
  StyledSnackbarContainerItem,
  StyledSnackbarText,
} from "@/styles/components/game/denied-snackbar.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_denied_snackbar } from "@/store/slice/game.slice";

const DeniedSnackbar: FC<{
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}> = ({ vertical, horizontal }) => {
  const theme = useTheme();
  const _show_denied_snackbar = useAppSelector(show_denied_snackbar);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={_show_denied_snackbar}
    >
      <StyledSnackbarContainer>
        <StyledSnackbarContainerItem $flexBasis="100px">
          <Image alt="denied" src="/no.png" width={60} height={60} />
        </StyledSnackbarContainerItem>
        <StyledSnackbarContainerItem $flexGrow={1}>
          <StyledSnackbarText $fontSize="16px" $color={theme.palette.text.main}>
            Hi, Your Proposal have been denied.
          </StyledSnackbarText>
        </StyledSnackbarContainerItem>
      </StyledSnackbarContainer>
    </Snackbar>
  );
};

export default DeniedSnackbar;
