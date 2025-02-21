import { useEffect, useContext } from "react";

// types
import type { ForwardedRef, MutableRefObject } from "react";
import type { IDeckType } from "@/types/store/slice/poker";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// redux
import { useAppSelector } from "../redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";
import Flip from "gsap/Flip";

// context
import { CardDealingAnimationContext } from "context";

gsap.registerPlugin(Flip);

function useCardDealingAnimation({
  player_with_node_ref,
  deck_node_ref,
}: {
  player_with_node_ref: ForwardedRef<WeakMap<IPokerPlayer, HTMLDivElement>>;
  deck_node_ref: MutableRefObject<Map<string, HTMLDivElement>>;
}) {
  const active_poker_players = useAppSelector(activePokerPlayers);
  const { is_card_dealing_animation_completed, updateCardDealingAnimation } =
    useContext(CardDealingAnimationContext);
  useEffect(() => {
    let batch: FlipBatch;
    if (active_poker_players.length && !is_card_dealing_animation_completed) {
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
          /**
           * getting hole cards of all the player from the
           * deck and appending those hole cards in their respective
           * poker player position inside hole cards container
           * with some styling
           */
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
                  card_node.setAttribute("is-animated", "true");
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
            ease: "expo.inOut",
            stagger: {
              each: 0.2,
            },
          });
        },
        onComplete(self) {
          /**
           * though we are inside oncomplete method and we should
           * remove those card which we appended directly without
           * use of settimeout but this method is a bit misleading
           * it get run before animation get completed because
           * of which if we directly remove the cards from the hole cards
           * container then animation is breaking, therefore we are just
           * waiting for some time bofore animation finish and then remove
           * the cards from the hole cards container
           */
          setTimeout(() => {
            Array.from(
              document.getElementsByClassName("hole-cards-container")
            ).forEach((container) => {
              Array.from(container.children).forEach((node) => {
                if (node.getAttribute("is-animated") == "true") {
                  container.removeChild(node);
                }
              });
            });
            updateCardDealingAnimation?.(true);
          }, 0.6 * active_poker_players.length * 1000);
        },
      });
      batch.run();
    }
    return () => {
      batch?.clear();
    };
  }, [active_poker_players.length, is_card_dealing_animation_completed]);
}

export { useCardDealingAnimation };
