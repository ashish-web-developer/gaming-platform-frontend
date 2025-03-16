import Image from "next/image";
import { useRef, useEffect } from "react";

// types
import type { FC } from "react";
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

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";

const PokerPlayer: FC<{
  player: IPokerPlayer | null;
  seat_index: number;
  dealer_id: number | null;
  bettor_id: number | null;
  show_hole_cards: boolean;
  profileAnimationHandler: (detail_container: HTMLDivElement) => void;
  cardHoverHandler?: (
    node: HTMLDivElement,
    event_type: "enter" | "leave"
  ) => void;
}> = ({
  player,
  seat_index,
  dealer_id,
  bettor_id,
  show_hole_cards,
  profileAnimationHandler,
  cardHoverHandler,
}) => {
  const players_details_ref = useRef<HTMLDivElement>(null);
  const avatar_url = useAvatarUrl(player?.user ?? null);
  const { id: user_id } = useAppSelector(User) || {};
  const is_auth = player?.player_id == user_id;
  const { action_type } = player ?? {};

  useEffect(() => {
    if (players_details_ref.current) {
      profileAnimationHandler(players_details_ref.current);
    }
  }, [!!player]);

  return (
    <StyledPokerPlayerWrapper
      $is_dealer={!!dealer_id && !!player && player?.player_id == dealer_id}
      $background_url={player ? avatar_url : null}
      $seat_index={seat_index}
      className="poker-player-container"
    >
      {player && (
        <>
          <StyledPokerPlayerDetails ref={players_details_ref}>
            <StyledPlayerName>{player.user.name}</StyledPlayerName>
            <StyledPlayerAmount>
              <Image
                id={`player-chips-${player.player_id}`}
                src="/poker/poker-player/poker-chips.png"
                width={16}
                height={16}
                alt="poker-chips"
              />
              <span>$ {player.total_chips_left} K</span>
            </StyledPlayerAmount>
          </StyledPokerPlayerDetails>
          <StyledHoleCardWrapper $is_folded={action_type == "fold"}>
            {player.hole_cards?.map(({ card_id, ...card }) => {
              return (
                <PokerCard
                  is_hole_card={true}
                  key={`card-${card_id}`}
                  scale={0.4}
                  {...card}
                  card_id={card_id}
                  show_card={show_hole_cards}
                  is_flipped={is_auth ? true : false}
                  cardHoverHandler={cardHoverHandler}
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
export default PokerPlayer;
