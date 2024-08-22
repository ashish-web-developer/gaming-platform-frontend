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
import { user } from "@/store/slice/user.slice";
import { active_cognimatch_players } from "@/store/slice/cognimatch.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const InfoSnackbar: FC<{
  receiver_name: string;
  children: string;
  show_count_down: boolean;
}> = ({ receiver_name, children, show_count_down }) => {
  const { id: user_id } = useAppSelector(user);
  const opponent_player = useAppSelector(active_cognimatch_players).filter(
    (player) => player.id !== user_id
  )[0];
  const opponent_player_avatar_url = useAvatarUrl(opponent_player);
  return (
    <>
      <StyledSnackbarContainer>
        <StyledUserAvatar>
          <StyledAvatarImage
            src={opponent_player_avatar_url}
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
