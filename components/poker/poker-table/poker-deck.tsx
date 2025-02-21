import styled from "styled-components";
import { forwardRef, useRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";
import { User } from "@/store/slice/login.slice";

// hooks
import { useCardDealingAnimation } from "@/hooks/poker/poker.hook";

const StyledDeckContainer = styled.div`
  position: absolute;
  left: 45%;
  top: 95px;
  visibility: hidden;
  & > div {
    position: absolute;
  }
`;

const PokerDeck: ForwardRefRenderFunction<
  WeakMap<IPokerPlayer, HTMLDivElement>,
  {
    deck: IDeckType;
  }
> = ({ deck }, player_with_node_ref) => {
  const deck_node_ref = useRef<Map<string, HTMLDivElement>>(new Map());
  const active_poker_players = useAppSelector(activePokerPlayers);
  const { id: user_id } = useAppSelector(User) || {};
  const [card1, card2] =
    active_poker_players.find((player) => {
      return player.player_id == user_id;
    })?.hole_cards || [];

  /**
   * handling card dealing animation
   */
  useCardDealingAnimation({ player_with_node_ref, deck_node_ref });

  return (
    <StyledDeckContainer>
      {deck.map(({ card_id, ...card }) => {
        return (
          <PokerCard
            ref_callback={(node) => {
              if (node) {
                deck_node_ref.current?.set(card_id, node);
              } else {
                deck_node_ref.current?.delete(card_id);
              }
            }}
            scale={0.4}
            {...card}
            key={`poker-card-${card_id}`}
            is_flipped={
              card_id == card1?.card_id || card_id == card2?.card_id
                ? true
                : false
            }
          />
        );
      })}
    </StyledDeckContainer>
  );
};
export default forwardRef(PokerDeck);
