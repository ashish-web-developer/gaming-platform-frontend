// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledPokerPlayer,
  StyledPokerPlayerWrapper,
  StyledPokerPlayerProfileWrapper,
  StyledPokerPlayerProfile,
  StyledPokerPlayerProfileImage,
  StyledTotalChips,
  StyledBetChipsWrapper,
  StyledPokerChipsWrapper,
  StyledPokerChipsImage,
  StyledBetChips,
} from "@/styles/components/poker/poker-player/poker-player.style";

// local components
import PokerActionCta from "@/components/poker/poker-player/poker-action-cta";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const PokerPlayer: FC<{
  align: "left" | "right" | "down";
  show_action_cta?: boolean;
  is_dealer?: boolean;
  user: IUsersWithConversation | undefined;
  buy_in_amount: number;
}> = ({
  align,
  show_action_cta = false,
  is_dealer = false,
  user,
  buy_in_amount,
}) => {
  const avatar_url = useAvatarUrl(user ?? null);
  return (
    <StyledPokerPlayer $show_action_cta={show_action_cta} $align={align}>
      <StyledPokerPlayerWrapper>
        <StyledPokerPlayerProfileWrapper $is_active={Boolean(user)}>
          <StyledPokerPlayerProfile>
            {user && (
              <StyledPokerPlayerProfileImage
                src={avatar_url}
                alt="user"
                fill={true}
              />
            )}
          </StyledPokerPlayerProfile>
        </StyledPokerPlayerProfileWrapper>
        <StyledTotalChips>
          {Boolean(buy_in_amount)
            ? `$ ${(buy_in_amount * 1000).toLocaleString()}`
            : "Waiting..."}
        </StyledTotalChips>
      </StyledPokerPlayerWrapper>
      <StyledBetChipsWrapper $align={align}>
        <StyledPokerChipsWrapper $align={align} $is_dealer={is_dealer}>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            fill={true}
            alt="chip"
          />
        </StyledPokerChipsWrapper>
        {!show_action_cta ? (
          <StyledBetChips>$ 6000.00</StyledBetChips>
        ) : (
          <PokerActionCta />
        )}
      </StyledBetChipsWrapper>
    </StyledPokerPlayer>
  );
};

export default PokerPlayer;
