// types
import type { FC } from "react";

// styled components
import {
  StyledSnackbarContainer,
  StyledUserAvatar,
  StyledContent,
  StyledText,
} from "@/styles/components/memory-game/info-snackbar/info-snackbar.style";

// local components
import InfoSnackbarCountdown from "@/components/memory-game/info-snackbar/info-snackbar-countdown";

// redux
import { useAppSelector } from "@/hooks/redux";
import { show_info_snackbar } from "@/store/slice/memory-game.slice";
import { gaming_user } from "@/store/slice/game.slice";

// hooks
import useAvatar from "@/hooks/profile";

const InfoSnackbar: FC<{
  children: string;
}> = ({ children }) => {
  const _gaming_user = useAppSelector(gaming_user);
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const _show_info_snackbar = useAppSelector(show_info_snackbar);
  return (
    <>
      {_show_info_snackbar && (
        <StyledSnackbarContainer>
          <StyledUserAvatar
            dangerouslySetInnerHTML={{ __html: gaming_user_avatar }}
          />
          <StyledContent>
            <StyledText $fontSize="16px">{_gaming_user?.name}</StyledText>
            <StyledText $fontSize="14px">{children}</StyledText>
          </StyledContent>
          <InfoSnackbarCountdown />
        </StyledSnackbarContainer>
      )}
    </>
  );
};

export default InfoSnackbar;
