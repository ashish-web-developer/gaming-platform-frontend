import { useRef } from "react";
// types
import type { FC, Dispatch, SetStateAction } from "react";
import type { IDeckType } from "@/types/store/slice/poker";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";
// hoc
import withPokerTableFunctionality from "@/hoc/poker/with-poker-table-functionality";
// local components
import MobilePokerTableVector from "@/components/poker/poker-table/mobile/mobile-poker-table-vector";
import MobilePokerPlayerSeat from "@/components/poker/poker-player-seat/mobile/mobile-poker-player-seat";
import MobilePokerActionCta from "@/components/poker/poker-player-seat/mobile/mobile-poker-action-cta";
import MobilePokerCard from "@/components/poker/poker-card/mobile/mobile-poker-card";
import MobilePokerSlider from "@/components/poker/poker-slider/mobile/mobile-poker-slider";

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
  StyledTableCardWrapper,
  StyledBorderedCard,
} from "@/styles/components/poker/poker-table/mobile/mobile-poker-table.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";

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
  const raise_cta_ref = useRef<HTMLButtonElement>(null);
  const auth_player = useAppSelector(activePokerPlayers).filter(
    (player) => player.player_id == user_id
  )[0];

  return (
    <StyledPokerMobileTableWrapper>
      <StyledPokerTableWrapper>
        <StyledLeftPlayerWrapper>
          {left_poker_players.map((player) => {
            if (player.player_id) {
              return (
                <MobilePokerPlayerSeat
                  key={`player-${player.player_id}`}
                  poker_player={player}
                  is_active={false}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                src={"/poker/poker-player/poker-chip.png"}
                alt="chip"
                width={25}
                height={25}
                key={`seat-${player.seat_index}`}
              />
            );
          })}
        </StyledLeftPlayerWrapper>
        <StyledRightPlayerWrapper>
          {right_poker_players.map((player) => {
            if (player.player_id) {
              return (
                <MobilePokerPlayerSeat
                  key={`player-${player.player_id}`}
                  poker_player={player}
                  is_active={false}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                src={"/poker/poker-player/poker-chip.png"}
                alt="chip"
                width={25}
                height={25}
                key={`seat-${player.seat_index}`}
              />
            );
          })}
        </StyledRightPlayerWrapper>
        <StyledBottomPlayerWrapper>
          {bottom_poker_players.map((player) => {
            if (player.player_id) {
              return (
                <MobilePokerPlayerSeat
                  key={`player-${player.player_id}`}
                  poker_player={player}
                  is_active={false}
                />
              );
            }
            return (
              <StyledPokerChipsImage
                style={{
                  marginTop: "17px",
                }}
                src={"/poker/poker-player/poker-chip.png"}
                alt="chip"
                width={25}
                height={25}
                key={`seat-${player.seat_index}`}
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

        {(Boolean(chips_in_pot) || Boolean(total_chips_betted)) && (
          <StyledChipsInPotWrapper>
            <StyledPokerChipsImage
              src={"/poker/poker-player/poker-chip.png"}
              alt="chip"
              width={15}
              height={15}
            />
            $ {chips_in_pot == 0 ? total_chips_betted : chips_in_pot}K
          </StyledChipsInPotWrapper>
        )}
        <MobilePokerTableVector />
        <StyledTableCardWrapper>
          {[
            ...(community_cards ? [...community_cards] : []),
            ...new Array(5 - no_of_community_cards).fill(null),
          ]?.map((card, index) => {
            if (card) {
              return (
                <MobilePokerCard
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
      {show_action_cta && user_id == bettor_id && (
        <MobilePokerActionCta ref={raise_cta_ref} />
      )}
      {show_poker_slider && auth_player?.total_chips_left && (
        <MobilePokerSlider
          total_chips_count={auth_player.total_chips_left}
          toggle_action_cta={(show) => set_show_action_cta(show)}
          ref={raise_cta_ref}
        />
      )}
    </StyledPokerMobileTableWrapper>
  );
};
export default withPokerTableFunctionality(MobilePokerTable, true);
