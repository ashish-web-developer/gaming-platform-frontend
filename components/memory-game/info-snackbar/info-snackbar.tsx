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
import { useAppSelector } from "@/hooks/redux.hook";
import { gaming_user } from "@/store/slice/game.slice";

// hooks
import useAvatar from "@/hooks/profile.hook";

const InfoSnackbar: FC<{
  receiver_name: string;
  children: string;
  show_count_down: boolean;
}> = ({ receiver_name, children, show_count_down }) => {
  const _gaming_user = useAppSelector(gaming_user);
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  return (
    <>
      <StyledSnackbarContainer>
        <StyledUserAvatar
          dangerouslySetInnerHTML={{ __html: gaming_user_avatar }}
        />
        <StyledContent>
          <StyledText $fontSize="16px">{receiver_name}</StyledText>
          <StyledText $fontSize="14px">{children}</StyledText>
        </StyledContent>
        {show_count_down && <InfoSnackbarCountdown />}
      </StyledSnackbarContainer>
    </>
  );
};

export default InfoSnackbar;
