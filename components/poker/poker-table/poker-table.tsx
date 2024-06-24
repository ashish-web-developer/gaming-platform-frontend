// types
import { type FC } from "react";
// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayerSeat from "@/components/poker/poker-player-seat/poker-player-seat";
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  bettor_id,
  active_poker_players,
  chips_in_pot,
  show_poker_slider,
} from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";
// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

// helpers
import { getPlayerPosition } from "@/helpers/poker/poker.helper";

const PokerTable: FC = () => {
  const _chips_in_pot = useAppSelector(chips_in_pot);
  const { id: _user_id } = useAppSelector(user);
  const height = usePokerTableHeight();
  const [poker_player] = useAppSelector(active_poker_players).filter(
    (player) => player.player_id == _user_id
  );
  const authicated_player_position = poker_player?.seat_number;
  const _active_poker_players = useAppSelector(active_poker_players);
  const _bettor_id = useAppSelector(bettor_id);
  const _show_poker_slider = useAppSelector(show_poker_slider);

  return (
    <StyledPokerTableWrapper>
      <StyledTableDealerProfile>
        <StyledTableDealerProfileImage
          alt="dealer"
          src={"/poker/poker-table/dealer.png"}
          fill={true}
        />
      </StyledTableDealerProfile>
      <StyledPokerVectorWrapper>
        {poker_player &&
          _active_poker_players.map((player) => {
            const player_position = getPlayerPosition(
              authicated_player_position,
              player
            );
            return (
              <PokerPlayerSeat
                key={player.id}
                align={player_position}
                show_action_cta={
                  !_show_poker_slider &&
                  _bettor_id == _user_id &&
                  _bettor_id == player.player_id
                    ? true
                    : false
                }
                show_poker_slider={
                  _show_poker_slider &&
                  _bettor_id == _user_id &&
                  _bettor_id == player.player_id
                    ? true
                    : false
                }
                poker_player={player}
              />
            );
          })}
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>
      {Boolean(_chips_in_pot) && (
        <StyledChipsInPotWrapper>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            alt="chip"
            width={25}
            height={25}
          />
          $ {(_chips_in_pot * 1000).toFixed(2)}
        </StyledChipsInPotWrapper>
      )}
      <StyledTableCardWrapper>
        {new Array(5).fill(0).map((el, index) => {
          return (
            <PokerCard key={`card-${index}`} suit={"diamond"} rank={"J"} />
          );
        })}
      </StyledTableCardWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
