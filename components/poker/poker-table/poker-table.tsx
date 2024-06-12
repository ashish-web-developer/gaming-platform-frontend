// types
import { type FC } from "react";
// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayer from "@/components/poker/poker-player/poker-player";
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { active_poker_players } from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";
// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

// helpers
import { getPlayerPosition } from "@/helpers/poker/poker.helper";

const PokerTable: FC = () => {
  const { id: _user_id } = useAppSelector(user);
  const height = usePokerTableHeight();
  const [poker_player] = useAppSelector(active_poker_players).filter(
    (player) => player.player_id == _user_id
  );
  const authicated_player_position = poker_player?.seat_number;
  const _active_poker_players = useAppSelector(active_poker_players);

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
              <PokerPlayer
                key={player.id}
                align={player_position}
                show_action_cta={
                  player.seat_number == authicated_player_position
                    ? true
                    : false
                }
                poker_player={player}
              />
            );
          })}
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>
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
