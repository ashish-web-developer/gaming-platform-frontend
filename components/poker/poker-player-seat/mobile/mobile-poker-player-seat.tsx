import type { FC } from "react";
import type { IPokerPlayer, ISeatType } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayerSeatWrapper,
  StyledPokerPlayerBuyInAmount,
  StyledCardContainer,
  StyledCardWrapper,
} from "@/styles/components/poker/poker-player-seat/mobile/mobile-poker-player-seat.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";
import MobilePokerCard from "@/components/poker/poker-card/mobile/mobile-poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { bettor_id, dealer_id } from "@/store/slice/poker/poker.slice";

type IProps = {
  poker_player: IPokerPlayer;
  is_active: boolean;
};
const MobilePokerPlayerSeat: FC<IProps> = ({ poker_player, is_active }) => {
  const { id: user_id } = useAppSelector(user);
  const _bettor_id = useAppSelector(bettor_id);
  const _dealer_id = useAppSelector(dealer_id);
  const is_bettor = poker_player?.player_id == _bettor_id;
  return (
    <StyledPokerPlayerSeatWrapper
      $seat_number={poker_player.seat_index as ISeatType}
      $betted_amount={poker_player?.current_betted_amount ?? 0}
    >
      {poker_player?.player_id == user_id && (
        <StyledCardContainer>
          {poker_player?.hole_cards?.map((hole_card, index) => {
            return (
              <StyledCardWrapper
                key={`card-${index}`}
                $rotate={index == 0 ? "-10deg" : "10deg"}
              >
                <MobilePokerCard suit={hole_card.suit} rank={hole_card.rank} />;
              </StyledCardWrapper>
            );
          })}
        </StyledCardContainer>
      )}
      <PokerPlayer
        player={poker_player}
        is_bettor={is_bettor}
        is_active={Boolean(poker_player)}
        is_dealer={poker_player?.player_id == _dealer_id}
      />
      <StyledPokerPlayerBuyInAmount>
        $ {(poker_player?.total_chips_left ?? 0).toFixed(2)} K
      </StyledPokerPlayerBuyInAmount>
    </StyledPokerPlayerSeatWrapper>
  );
};

export default MobilePokerPlayerSeat;
