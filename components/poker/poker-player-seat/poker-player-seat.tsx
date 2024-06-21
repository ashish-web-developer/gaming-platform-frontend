import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayerSeatWrapper,
  StyledPokerChipsImage,
  StyledPokerPlayerWrapper,
} from "@/styles/components/poker/poker-player-seat/poker-player-seat.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";

// redux
import { dealer_id, bettor_id } from "@/store/slice/poker/poker.slice";

// hooks
import { useAppSelector } from "@/hooks/redux.hook";

const PokerPlayerSeat: FC<{
  align: "left" | "right" | "down";
  show_action_cta?: boolean;
  poker_player: IPokerPlayer | undefined;
}> = ({ align, show_action_cta = false, poker_player }) => {
  const _dealer_id = useAppSelector(dealer_id);
  const _bettor_id = useAppSelector(bettor_id);
  const is_bettor = poker_player?.player_id == _bettor_id;
  console.log("value of is_dealer", _dealer_id == poker_player?.player_id);
  return (
    <>
      <StyledPokerPlayerSeatWrapper
        $align={align}
        $is_dealer={poker_player?.player_id == _dealer_id}
      >
        <StyledPokerPlayerWrapper $align={align}>
          <PokerPlayer
            player={poker_player as IPokerPlayer}
            is_bettor={is_bettor}
            is_active={Boolean(poker_player)}
          />
        </StyledPokerPlayerWrapper>
        <StyledPokerChipsImage
          src={"/poker/poker-player/poker-chip.png"}
          fill={true}
          alt="chip"
        />
      </StyledPokerPlayerSeatWrapper>
    </>
  );
};

export default PokerPlayerSeat;
