// types
import type { FC, Dispatch, SetStateAction } from "react";
import type { IDeckType } from "@/types/store/slice/poker";
import type { IPokerPlayer, ISeatType } from "@/types/store/slice/poker/poker";
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

// hoc
import withPokerTableFunctionality from "@/hoc/poker/with-poker-table-functionality";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayerSeat from "@/components/poker/poker-player-seat/poker-player-seat";
import PokerCard from "@/components/poker/poker-card/poker-card";

// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

type IProps = {
  left_poker_players: IPokerPlayer[];
  right_poker_players: IPokerPlayer[];
  bottom_poker_players: IPokerPlayer[];
  community_cards: IDeckType | null;
  chips_in_pot: number;
  total_chips_betted: number;
  show_poker_slider: boolean;
  bettor_id: number | null;
  show_action_cta: boolean;
  set_show_action_cta: Dispatch<SetStateAction<boolean>>;
  no_of_community_cards: number;
  user_id: number | null;
};
const PokerTable: FC<IProps> = ({
  left_poker_players,
  right_poker_players,
  bottom_poker_players,
  community_cards,
  chips_in_pot,
  total_chips_betted,
  show_poker_slider,
  bettor_id,
  show_action_cta,
  set_show_action_cta,
  no_of_community_cards,
  user_id,
}) => {
  const height = usePokerTableHeight();
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
            if (player.player_id) {
              return (
                <PokerPlayerSeat
                  seat_number={player.seat_index as ISeatType}
                  poker_player={player}
                  show_poker_slider={false}
                  show_action_cta={false}
                  toggle_action_cta={(show: boolean) =>
                    set_show_action_cta(show)
                  }
                  key={`player-${player.player_id}`}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                src={"/poker/poker-player/poker-chip.png"}
                alt="chips-image"
                width={50}
                height={50}
                key={`seat-${player.seat_index}`}
              />
            );
          })}
        </StyledLeftPlayerWrapper>
        <StyledBottomPlayerWrapper>
          {bottom_poker_players.map((player) => {
            if (player.player_id) {
              return (
                <PokerPlayerSeat
                  seat_number={player.seat_index as ISeatType}
                  poker_player={player}
                  show_action_cta={
                    show_action_cta &&
                    bettor_id == user_id &&
                    bettor_id == player.player_id
                      ? true
                      : false
                  }
                  show_poker_slider={
                    show_poker_slider &&
                    bettor_id == user_id &&
                    bettor_id == player.player_id
                      ? true
                      : false
                  }
                  toggle_action_cta={(show: boolean) =>
                    set_show_action_cta(show)
                  }
                  show_current_betted_amount={!show_poker_slider}
                  key={`player-${player.player_id}`}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                src={"/poker/poker-player/poker-chip.png"}
                alt="chips-image"
                width={50}
                height={50}
                key={`seat-${player.seat_index}`}
              />
            );
          })}
        </StyledBottomPlayerWrapper>
        <StyledRightPlayerWrapper>
          {right_poker_players.map((player) => {
            if (player.player_id) {
              return (
                <PokerPlayerSeat
                  seat_number={player.seat_index as ISeatType}
                  poker_player={player}
                  show_poker_slider={false}
                  show_action_cta={false}
                  toggle_action_cta={(show: boolean) =>
                    set_show_action_cta(show)
                  }
                  key={`player-${player.player_id}`}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                src={"/poker/poker-player/poker-chip.png"}
                alt="chips-image"
                width={50}
                height={50}
                key={`seat-${player.seat_index}`}
              />
            );
          })}
        </StyledRightPlayerWrapper>
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>

      {(Boolean(chips_in_pot) || Boolean(total_chips_betted)) && (
        <StyledChipsInPotWrapper>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            alt="chip"
            width={25}
            height={25}
          />
          ${" "}
          {(
            (chips_in_pot == 0 ? total_chips_betted : chips_in_pot) * 1000
          ).toFixed(2)}
        </StyledChipsInPotWrapper>
      )}
      <StyledTableCardWrapper>
        {[
          ...(community_cards ? [...community_cards] : []),
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

export default withPokerTableFunctionality(PokerTable, false);
