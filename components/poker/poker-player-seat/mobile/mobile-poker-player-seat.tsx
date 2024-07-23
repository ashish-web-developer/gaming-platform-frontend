import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayerSeatWrapper,
  StyledPokerPlayerBuyInAmount,
} from "@/styles/components/poker/poker-player-seat/mobile/mobile-poker-player-seat.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { bettor_id, dealer_id } from "@/store/slice/poker/poker.slice";

type IProps = {
  poker_player: IPokerPlayer;
  is_active: boolean;
};
const MobilePokerPlayerSeat: FC<IProps> = ({ poker_player, is_active }) => {
  const _bettor_id = useAppSelector(bettor_id);
  const _dealer_id = useAppSelector(dealer_id);
  const is_bettor = poker_player?.player_id == _bettor_id;
  return (
    <StyledPokerPlayerSeatWrapper>
      <PokerPlayer
        player={poker_player}
        is_bettor={is_bettor}
        is_active={Boolean(poker_player)}
        is_dealer={poker_player?.player_id == _dealer_id}
      />
      <StyledPokerPlayerBuyInAmount>
        $ {((poker_player?.total_chips_left ?? 0)).toFixed(2)} K
      </StyledPokerPlayerBuyInAmount>
    </StyledPokerPlayerSeatWrapper>
  );
};

export default MobilePokerPlayerSeat;
