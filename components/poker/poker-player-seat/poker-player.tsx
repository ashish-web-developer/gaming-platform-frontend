import Image from "next/image";
import { forwardRef, useEffect, useRef } from "react";

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

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  const hole_cards_container = useRef<HTMLDivElement>(null);
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
    return () => {
      while (hole_cards_container.current?.firstChild) {
        hole_cards_container.current.removeChild(
          hole_cards_container.current.firstChild
        );
      }
    };
  }, [player]);

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
