// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

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

// redux
import { dealer_id, bettor_id } from "@/store/slice/poker/poker.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useAppSelector } from "@/hooks/redux.hook";

const PokerPlayer: FC<{
  align: "left" | "right" | "down";
  show_action_cta?: boolean;
  poker_player: IPokerPlayer | undefined;
}> = ({ align, show_action_cta = false, poker_player }) => {
  const _dealer_id = useAppSelector(dealer_id);
  const avatar_url = useAvatarUrl(poker_player?.user ?? null);
  const _bettor_id = useAppSelector(bettor_id);
  const is_bettor = poker_player?.player_id == _bettor_id;
  return (
    <StyledPokerPlayer $show_action_cta={show_action_cta} $align={align}>
      <StyledPokerPlayerWrapper>
        <StyledPokerPlayerProfileWrapper
          $is_bettor={is_bettor}
          $is_active={Boolean(poker_player)}
        >
          <StyledPokerPlayerProfile $is_bettor={is_bettor}>
            {poker_player && (
              <StyledPokerPlayerProfileImage
                src={avatar_url}
                alt="user"
                fill={true}
              />
            )}
          </StyledPokerPlayerProfile>
        </StyledPokerPlayerProfileWrapper>
        <StyledTotalChips>
          {Boolean(poker_player?.total_chips_left)
            ? `$ ${(
                (poker_player?.total_chips_left ?? 0) * 1000
              ).toLocaleString()}`
            : "Waiting..."}
        </StyledTotalChips>
      </StyledPokerPlayerWrapper>
      <StyledBetChipsWrapper $align={align}>
        <StyledPokerChipsWrapper
          $align={align}
          $is_dealer={poker_player?.player_id == _dealer_id}
        >
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
