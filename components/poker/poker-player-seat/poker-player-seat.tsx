import { useRef } from "react";
// types
import type { FC } from "react";
import type { IPokerPlayer, ISeatType } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayerSeatWrapper,
  StyledPokerPlayerBuyInAmount,
  StyledPokerChipsImage,
  StyledPokerPlayerWrapper,
  StyledCardContainer,
  StyledCardWrapper,
  StyledPokerActionCtaWrapper,
  StyledBettedAmount,
} from "@/styles/components/poker/poker-player-seat/poker-player-seat.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";
import PokerActionCta from "@/components/poker/poker-player-seat/poker-action-cta";
import PokerSlider from "@/components/poker/poker-slider/poker-slider";
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { user } from "@/store/slice/user.slice";
import { dealer_id, bettor_id } from "@/store/slice/poker/poker.slice";

// hooks
import { useAppSelector } from "@/hooks/redux.hook";

const PokerPlayerSeat: FC<{
  seat_number: ISeatType;
  show_action_cta?: boolean;
  poker_player: IPokerPlayer | undefined;
  show_poker_slider: boolean;
  toggle_action_cta: (show: boolean) => void;
}> = ({
  seat_number,
  show_action_cta = false,
  poker_player,
  show_poker_slider,
  toggle_action_cta,
}) => {
  const { id: user_id } = useAppSelector(user);
  const raise_cta_ref = useRef<HTMLDivElement>(null);
  const _dealer_id = useAppSelector(dealer_id);
  const _bettor_id = useAppSelector(bettor_id);
  const is_bettor = poker_player?.player_id == _bettor_id;
  return (
    <>
      <StyledPokerPlayerSeatWrapper
        $seat_number={seat_number}
        $is_dealer={poker_player?.player_id == _dealer_id}
      >
        <StyledPokerPlayerWrapper $seat_number={seat_number}>
          {poker_player?.player_id == user_id && (
            <StyledCardContainer>
              {poker_player?.hole_cards?.map((hole_card, index) => {
                return (
                  <StyledCardWrapper
                    key={`card-${index}`}
                    $rotate={index == 0 ? "-10deg" : "10deg"}
                  >
                    <PokerCard suit={hole_card.suit} rank={hole_card.rank} />;
                  </StyledCardWrapper>
                );
              })}
            </StyledCardContainer>
          )}
          <PokerPlayer
            player={poker_player as IPokerPlayer}
            is_bettor={is_bettor}
            is_active={Boolean(poker_player)}
          />
          <StyledPokerPlayerBuyInAmount>
            $ {((poker_player?.total_chips_left ?? 0) * 1000).toFixed(2)}
          </StyledPokerPlayerBuyInAmount>
        </StyledPokerPlayerWrapper>
        <StyledPokerChipsImage
          $is_folded={poker_player?.action_type == "fold"}
          src={"/poker/poker-player/poker-chip.png"}
          fill={true}
          alt="chip"
        />
        {show_action_cta && (
          <StyledPokerActionCtaWrapper>
            <PokerActionCta ref={raise_cta_ref} />
          </StyledPokerActionCtaWrapper>
        )}
        {show_poker_slider && (
          <PokerSlider
            total_chips_count={poker_player?.total_chips_left as number}
            ref={raise_cta_ref}
            toggle_action_cta={toggle_action_cta}
          />
        )}

        {!show_action_cta &&
          !show_poker_slider &&
          poker_player?.current_betted_amount && (
            <StyledBettedAmount $seat_number={seat_number}>
              $ {(poker_player?.current_betted_amount ?? 0) * 1000}
            </StyledBettedAmount>
          )}
      </StyledPokerPlayerSeatWrapper>
    </>
  );
};

export default PokerPlayerSeat;
