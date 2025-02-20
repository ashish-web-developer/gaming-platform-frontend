import styled from "styled-components";
import { forwardRef, useRef, useEffect } from "react";
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

// gsap
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const StyledDeckContainer = styled.div`
  position: absolute;
  left: 45%;
  top: 95px;
  // visibility: hidden;
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
  useEffect(() => {
    let batch: FlipBatch;
    if (active_poker_players.length) {
      batch = Flip.batch("card-animation");
      batch.add({
        /**
         * this will return the previous
         * state of the cards_node
         *
         */
        getState() {
          /**
           * reducing hole cards of all the player to an array
           * then getting the node of those hole cards inside the
           * deck container,then based on those cards_node we are
           * getting the flip state
           */
          const hole_cards_of_all_player =
            active_poker_players.reduce<IDeckType>((hole_cards, player) => {
              if (player.hole_cards) {
                return [...hole_cards, ...player.hole_cards];
              }
              return hole_cards;
            }, []);

          // converting hole_cards to card node
          const card_node = hole_cards_of_all_player.map((card) => {
            return deck_node_ref.current?.get(card.card_id) as HTMLDivElement;
          });
          return Flip.getState(card_node);
        },

        /**
         * Here we are doing all the dom related manipulation
         */
        setState() {
          active_poker_players.forEach((player) => {
            if (
              typeof player_with_node_ref !== "function" &&
              player_with_node_ref?.current
            ) {
              const player_container_node =
                player_with_node_ref.current.get(player);
              const hole_cards_container_node =
                player_container_node?.getElementsByClassName(
                  "hole-cards-container"
                );
              if (hole_cards_container_node) {
                player.hole_cards?.forEach((card, index) => {
                  let card_node = deck_node_ref.current.get(
                    card.card_id
                  ) as HTMLDivElement;
                  if (index == 0) {
                    card_node.style.rotate = "-6deg";
                  } else {
                    card_node.style.rotate = "6deg";
                    card_node.style.left = "-16px";
                  }
                  hole_cards_container_node[0].appendChild(card_node);
                });
              }
            }
          });
        },
        animate(self) {
          Flip.from(self.state, {
            duration: 0.2 * active_poker_players.length,
            ease: "expo.inOut",
            stagger: {
              each: 0.2,
            },
          });
        },
      });
      batch.run();
    }
    return () => {
      batch?.clear();
    };
  }, [active_poker_players.length]);

  return (
    <StyledDeckContainer>
      {deck.map(({ card_id, ...card }) => {
        return (
          <PokerCard
            ref_callback={(node) => {
              deck_node_ref.current?.set(card_id, node);
              return () => {
                deck_node_ref.current?.delete(card_id);
              };
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
