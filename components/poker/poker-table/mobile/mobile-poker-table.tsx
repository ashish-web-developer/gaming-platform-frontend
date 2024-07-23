// types

import type { FC, Dispatch, SetStateAction } from "react";
import type { IDeckType } from "@/types/store/slice/poker";
import type { IPokerPlayer, ISeatType } from "@/types/store/slice/poker/poker";
// hoc
import withPokerTableFunctionality from "@/hoc/poker/with-poker-table-functionality";
// local components
import MobilePokerTableVector from "@/components/poker/poker-table/mobile/mobile-poker-table-vector";
import MobilePokerPlayerSeat from "@/components/poker/poker-player-seat/mobile/mobile-poker-player-seat";

// styled components
import {
  StyledPokerMobileTableWrapper,
  StyledPokerTableWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
  StyledLeftPlayerWrapper,
  StyledRightPlayerWrapper,
  StyledBottomPlayerWrapper,
} from "@/styles/components/poker/poker-table/mobile/mobile-poker-table.style";

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

const MobilePokerTable: FC<IProps> = ({
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
  console.log(left_poker_players);
  return (
    <StyledPokerMobileTableWrapper>
      <StyledPokerTableWrapper>
        <StyledLeftPlayerWrapper>
          {left_poker_players.map((player) => {
            return (
              <MobilePokerPlayerSeat
                key={`player-${player.player_id}`}
                poker_player={player}
                is_active={false}
              />
            );
          })}
        </StyledLeftPlayerWrapper>
        <StyledRightPlayerWrapper>
          {right_poker_players.map((player) => {
            return (
              <MobilePokerPlayerSeat
                key={`player-${player.player_id}`}
                poker_player={player}
                is_active={false}
              />
            );
          })}
        </StyledRightPlayerWrapper>
        <StyledBottomPlayerWrapper>
          {bottom_poker_players.map((player) => {
            return (
              <MobilePokerPlayerSeat
                key={`player-${player.player_id}`}
                poker_player={player}
                is_active={false}
              />
            );
          })}
        </StyledBottomPlayerWrapper>
        <StyledTableDealerProfile>
          <StyledTableDealerProfileImage
            alt="dealer"
            src={"/poker/poker-table/dealer.png"}
            fill={true}
          />
        </StyledTableDealerProfile>
        <StyledChipsInPotWrapper>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            alt="chip"
            width={15}
            height={15}
          />
          800k
        </StyledChipsInPotWrapper>
        <MobilePokerTableVector />
      </StyledPokerTableWrapper>
    </StyledPokerMobileTableWrapper>
  );
};
export default withPokerTableFunctionality(MobilePokerTable, true);
