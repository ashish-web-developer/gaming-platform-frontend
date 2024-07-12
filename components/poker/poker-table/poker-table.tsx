import { useState } from "react";
// types
import { type FC } from "react";
import type { ISeatType } from "@/types/store/slice/poker/poker";
// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledLeftPlayerWrapper,
  StyledRightPlayerWrapper,
  StyledBottomPlayerWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
  StyledBorderedCard,
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
  community_cards,
} from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";
// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

const PokerTable: FC = () => {
  let _active_poker_players = useAppSelector(active_poker_players);
  /**
   * Sorting array in descending order on the
   * on the basis of seat number
   */
  _active_poker_players = [..._active_poker_players].sort(
    (a, b) => b.seat_number - a.seat_number
  );
  const { id: user_id } = useAppSelector(user);

  const auth_player_index = _active_poker_players.findIndex(
    (player) => player.player_id == user_id
  );

  /**
   * rotating array such that
   * seat index of auth player
   * be at 3 index
   */
  _active_poker_players = _active_poker_players
    .slice(-(3 - auth_player_index))
    .concat(_active_poker_players.slice(0, -(3 - auth_player_index)))
    .map((player, index) => {
      return {
        ...player,
        seat_index: index as ISeatType,
      };
    });

  /**
   * Deciding what to be kept on left, right and bottom
   * of the table on the basis of seat_index
   */
  const left_poker_players = _active_poker_players.filter((player) =>
    [0, 1].includes(player.seat_index as number)
  );
  const bottom_poker_players = _active_poker_players.filter((player) =>
    [2, 3, 4].includes(player.seat_index as number)
  );
  const right_poker_players = _active_poker_players.filter((player) =>
    [5, 6].includes(player.seat_index as number)
  );
  const _community_cards = useAppSelector(community_cards);
  const no_of_community_cards = _community_cards?.length ?? 0;
  const _chips_in_pot = useAppSelector(chips_in_pot);
  const total_chips_betted = _active_poker_players.reduce(
    (accumulator, player) => {
      if (player.current_betted_amount) {
        return accumulator + player.current_betted_amount;
      }
      return accumulator;
    },
    0
  );
  const height = usePokerTableHeight();
  const _bettor_id = useAppSelector(bettor_id);
  const _show_poker_slider = useAppSelector(show_poker_slider);
  const [show_action_cta, set_show_action_cta] = useState<boolean>(true);

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
        <StyledLeftPlayerWrapper>
          {left_poker_players.map((player) => {
            return (
              <PokerPlayerSeat
                seat_number={player.seat_index as ISeatType}
                poker_player={player}
                show_poker_slider={false}
                show_action_cta={false}
                toggle_action_cta={(show: boolean) => set_show_action_cta(show)}
                key={`player-${player.player_id}`}
              />
            );
          })}
        </StyledLeftPlayerWrapper>
        <StyledBottomPlayerWrapper>
          {bottom_poker_players.map((player) => {
            return (
              <PokerPlayerSeat
                seat_number={player.seat_index as ISeatType}
                poker_player={player}
                show_action_cta={
                  show_action_cta &&
                  _bettor_id == user_id &&
                  _bettor_id == player.player_id
                    ? true
                    : false
                }
                show_poker_slider={
                  _show_poker_slider &&
                  _bettor_id == user_id &&
                  _bettor_id == player.player_id
                    ? true
                    : false
                }
                toggle_action_cta={(show: boolean) => set_show_action_cta(show)}
                key={`player-${player.player_id}`}
              />
            );
          })}
        </StyledBottomPlayerWrapper>
        <StyledRightPlayerWrapper>
          {right_poker_players.map((player) => {
            return (
              <PokerPlayerSeat
                seat_number={player.seat_index as ISeatType}
                poker_player={player}
                show_poker_slider={false}
                show_action_cta={false}
                toggle_action_cta={(show: boolean) => set_show_action_cta(show)}
                key={`player-${player.player_id}`}
              />
            );
          })}
        </StyledRightPlayerWrapper>
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>

      {(Boolean(_chips_in_pot) || Boolean(total_chips_betted)) && (
        <StyledChipsInPotWrapper>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            alt="chip"
            width={25}
            height={25}
          />
          ${" "}
          {(
            (_chips_in_pot == 0 ? total_chips_betted : _chips_in_pot) * 1000
          ).toFixed(2)}
        </StyledChipsInPotWrapper>
      )}
      <StyledTableCardWrapper>
        {[
          ...(_community_cards ? [..._community_cards] : []),
          ...new Array(5 - no_of_community_cards).fill(null),
        ]?.map((card, index) => {
          if (card) {
            return (
              <PokerCard
                key={`card-${index}`}
                suit={card.suit}
                rank={card.rank}
              />
            );
          }
          return <StyledBorderedCard key={`bordered-card-${index}`} />;
        })}
      </StyledTableCardWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
