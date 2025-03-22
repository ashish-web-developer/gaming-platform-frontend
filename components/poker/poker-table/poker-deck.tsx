import styled from "styled-components";
import { useEffect, useContext } from "react";
// types
import { type FC } from "react";
import type { IDeckType } from "@/types/store/slice/poker";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";
import { User } from "@/store/slice/login.slice";

// context
import { MediaContext } from "context";

// gsap
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const StyledDeckContainer = styled.div`
  position: absolute;
  left: 45%;
  top: 95px;
  & > div {
    position: absolute;
  }
`;

const PokerDeck: FC<{
  deck: IDeckType;
  updateShowHoleCards: (val: boolean) => void;
}> = ({ deck, updateShowHoleCards }) => {
  const active_poker_players = useAppSelector(activePokerPlayers);
  const { id: user_id } = useAppSelector(User) || {};
  const [card1, card2] =
    active_poker_players.find((player) => {
      return player.player_id == user_id;
    })?.hole_cards || [];
  const media_ref = useContext(MediaContext);
  const have_player_got_card = active_poker_players.every((player) => {
    return !!player.hole_cards;
  });

  useEffect(() => {
    const batch = Flip.batch("card-dealing-animation");
    if (have_player_got_card) {
      batch.add({
        getState() {
          return Flip.getState(".poker-card");
        },
        setState() {
          updateShowHoleCards(true);
        },
        animate(self) {
          Flip.from(self.state, {
            targets: ".player-hole-card",
            ease: "expo.inOut",
            spin: true,
            stagger: {
              each: 0.2,
            },
          });
        },
        onStart() {
          function handleCardDealingEffect() {
            const card_dealing_sound_promise = new Promise(function (resolve) {
              // @ts-ignore
              media_ref.current.card_dealing_sound.onended = resolve;
            });
            // @ts-ignore
            media_ref.current?.card_dealing_sound.play();
            return card_dealing_sound_promise;
          }
          if (media_ref.current.card_dealing_sound) {
            media_ref.current.card_dealing_sound.playbackRate = 1.5;
            (async function () {
              for (let i = 0; i <= active_poker_players.length - 1; i++) {
                await handleCardDealingEffect();
              }
            })();
          }
        },
      });
      batch.run();
    }
    return () => {
      batch.kill();
    };
  }, [have_player_got_card]);

  return (
    <StyledDeckContainer>
      {deck.map(({ card_id, ...card }) => {
        return (
          <PokerCard
            scale={0.4}
            {...card}
            card_id={card_id}
            key={`poker-card-${card_id}`}
            show_card={false}
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
export default PokerDeck;
