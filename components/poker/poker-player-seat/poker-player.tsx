import Image from "next/image";
import { forwardRef, useRef, useContext } from "react";

// types
import type { ForwardRefRenderFunction } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

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

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";

// context
import { CardDealingAnimationContext } from "context";

const PokerPlayer: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    player: IPokerPlayer | null;
    seat_index: number;
    dealer_id: number | null;
    bettor_id: number | null;
  }
> = ({ player, seat_index, dealer_id, bettor_id }, container_ref) => {
  const players_details_ref = useRef<HTMLDivElement>(null);
  const avatar_url = useAvatarUrl(player?.user ?? null);
  const { id: user_id } = useAppSelector(User) || {};
  const is_auth = player?.player_id == user_id;
  const hole_cards_container = useRef<HTMLDivElement>(null);
  const { is_card_dealing_animation_completed } = useContext(
    CardDealingAnimationContext
  );
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
          <StyledHoleCardWrapper
            className="hole-cards-container"
            ref={hole_cards_container}
          >
            {is_card_dealing_animation_completed &&
              player.hole_cards?.map(({ card_id, ...card }) => {
                return (
                  <PokerCard
                    key={`card-${card_id}`}
                    scale={0.4}
                    {...card}
                    is_flipped={is_auth ? true : false}
                  />
                );
              })}
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
