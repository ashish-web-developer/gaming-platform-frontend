import Image from "next/image";
import { forwardRef, useRef, useContext, useEffect, useState } from "react";

// types
import type { ForwardRefRenderFunction } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// styled components
import {
  StyledPokerPlayerWrapper,
  StyledPokerPlayerDetails,
  StyledHoleCardWrapper,
  StyledPlayerName,
  StyledPlayerAmount,
  StyledAmountBettedWrapper,
  StyledAmountBetted,
  StyledSpinner,
} from "@/styles/components/poker/poker-player-seat/poker-player.style";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

// context
import { DeckNodeContext, FlipBatchContext } from "context";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";

const PokerPlayer: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    player: IPokerPlayer | null;
    seat_index: number;
    dealer_id: number | null;
    bettor_id: number | null;
    updatePlayCardAnimation: (val: boolean) => void;
  }
> = (
  { player, seat_index, dealer_id, bettor_id, updatePlayCardAnimation },
  container_ref
) => {
  const players_details_ref = useRef<HTMLDivElement>(null);
  const avatar_url = useAvatarUrl(player?.user ?? null);
  const deck_node_ref = useContext(DeckNodeContext);
  const batch_ref = useContext(FlipBatchContext);
  const hole_cards_container_ref = useRef<HTMLDivElement>(null);
  const no_of_poker_players = useAppSelector(activePokerPlayers).length;
  const [hole_cards_node, setHoleCardNode] = useState<HTMLDivElement[]>([]);
  useGSAP(
    () => {
      if (player) {
        gsap.fromTo(
          players_details_ref.current,
          {
            scale: 1.3,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "elastic.out",
            delay: 0.5,
          }
        );
      }
    },
    { dependencies: [player] }
  );

  useEffect(() => {
    let batch_actions: FlipBatchAction[] = [];
    if (player?.hole_cards?.length) {
      player.hole_cards.forEach((card, index) => {
        let node = deck_node_ref.current?.get(card.card_id) as HTMLDivElement;
        const batch_action = batch_ref.current?.add({
          getState(self) {
            return Flip.getState(node);
          },
          setState(self) {
            node.parentNode?.removeChild(node);
            hole_cards_container_ref.current?.appendChild(node);
            if (index == 0) {
              node.style.rotate = "-6deg";
            } else {
              node.style.rotate = "6deg";
              node.style.left = "-35px";
            }
          },
          animate(self) {
            Flip.from(self.state, {
              ease: "expo.inOut",
              duration: 1,
              spin: 1,
            });
          },
          once: true,
        });
        batch_actions.push(batch_action as FlipBatchAction);
      });
      if (batch_ref.current?.actions.length == 2 * no_of_poker_players) {
        updatePlayCardAnimation(true);
      }
    }
    return () => {
      batch_actions.forEach((batch_action) => {
        batch_ref.current?.remove(batch_action);
      });
      player?.hole_cards?.forEach((card) => {
        let node = deck_node_ref.current?.get(card.card_id) as HTMLDivElement;
        hole_cards_container_ref.current?.removeChild(node);
      });
    };
  }, [player?.hole_cards?.length, no_of_poker_players]);

  return (
    <StyledPokerPlayerWrapper
      $is_dealer={!!dealer_id && !!player && player?.player_id == dealer_id}
      id="player"
      ref={container_ref}
      $background_url={player ? avatar_url : null}
      $seat_index={seat_index}
    >
      {player && (
        <>
          <StyledPokerPlayerDetails ref={players_details_ref}>
            <StyledPlayerName>{player.user.name}</StyledPlayerName>
            <StyledPlayerAmount>
              $ {player.total_chips_left} K
            </StyledPlayerAmount>
          </StyledPokerPlayerDetails>
          <StyledHoleCardWrapper ref={hole_cards_container_ref}>
            {/* {player.hole_cards?.map((card) => {
              return <PokerCard scale={0.4} {...card} />;
            })} */}
          </StyledHoleCardWrapper>
          {player.current_betted_amount && (
            <StyledAmountBettedWrapper $seat_index={seat_index}>
              <Image
                src="/poker/poker-player/poker-chips.png"
                width={16}
                height={16}
                alt="poker-chips"
              />
              <StyledAmountBetted>
                $ {player.current_betted_amount} K{" "}
              </StyledAmountBetted>
            </StyledAmountBettedWrapper>
          )}
        </>
      )}
      {bettor_id && bettor_id == player?.player_id && <StyledSpinner />}
    </StyledPokerPlayerWrapper>
  );
};
export default forwardRef(PokerPlayer);
