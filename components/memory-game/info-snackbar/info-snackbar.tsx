// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledSnackbarContainer,
  StyledUserAvatar,
  StyledAvatarImage,
  StyledContent,
  StyledText,
  StyledMessage,
} from "@/styles/components/memory-game/info-snackbar/info-snackbar.style";

// local components
import InfoSnackbarCountdown from "@/components/memory-game/info-snackbar/info-snackbar-countdown";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { gaming_user } from "@/store/slice/game.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const InfoSnackbar: FC<{
  receiver_name: string;
  children: string;
  show_count_down: boolean;
}> = ({ receiver_name, children, show_count_down }) => {
  const _gaming_user = useAppSelector(gaming_user);
  const gaming_user_avatar_url = useAvatarUrl(
    _gaming_user as IUsersWithConversation
  );
  return (
    <>
      <StyledSnackbarContainer>
        <StyledUserAvatar>
          <StyledAvatarImage
            src={gaming_user_avatar_url}
            fill={true}
            alt="user-avatar"
          />
        </StyledUserAvatar>
        <StyledContent>
          <StyledText $fontSize="16px">{receiver_name}</StyledText>
          <StyledMessage>{children}</StyledMessage>
        </StyledContent>
        {show_count_down && <InfoSnackbarCountdown />}
      </StyledSnackbarContainer>
    </>
  );
};

export default InfoSnackbar;
