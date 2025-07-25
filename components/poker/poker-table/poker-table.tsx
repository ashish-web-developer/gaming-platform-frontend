import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { createPortal } from "react-dom";
// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";

// styled components
import {
  StyledImageContainer,
  StyledImage,
  StyledSvgWrapper,
  StyledCommunityCardsWrapper,
  StyledPokerSliderWrapper,
  StyledChipsInPotWrapper,
  StyledChipsInPot,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";
import PokerBuyInDialog from "@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog";
const PokerCard = dynamic(
  () => import("@/components/poker/poker-card/poker-card"),
  {
    ssr: false,
  }
);

const PokerDeck = dynamic(
  () => import("@/components/poker/poker-table/poker-deck"),
  {
    ssr: false,
  }
);

const PokerActionCta = dynamic(
  () => import("@/components/poker/poker-table/poker-action-cta"),
  {
    ssr: false,
  }
);


// hoc
import withPokerTableFunctionality from "@/hoc/poker/with-poker-table-functionality";

// gsap
import gsap from "gsap";

// hooks
import { useSeatRotatingAnimation } from "@/hooks/poker/poker.hook";

type IProps = {
  poker_players: Array<IPokerPlayer | null>;
  community_cards: IDeckType | null;
  deck: IDeckType;
  show_buy_in_modal: boolean;
  chips_in_pot: number;
  dealer_id: number | null;
  bettor_id: number | null;
  auth_player?: IPokerPlayer;
  no_of_community_cards: number;
  user_id: number | null;
  time_left: number;
  show_hole_cards: boolean;
  updateShowHoleCards: (val: boolean) => void;
  updateShowWaitingBanner: (val: boolean) => void;
};
const PokerTable: FC<IProps> = ({
  poker_players,
  community_cards,
  deck,
  show_buy_in_modal,
  chips_in_pot,
  bettor_id,
  auth_player,
  dealer_id,
  no_of_community_cards,
  user_id,
  time_left,
  show_hole_cards,
  updateShowHoleCards,
  updateShowWaitingBanner,
}) => {
  const container_ref = useRef<HTMLDivElement>(null);
  const contextSafe = useSeatRotatingAnimation({
    scope: container_ref,
  });

  /**
   * This animation will get
   * run on the close of buy in modal
   */
  const profileAnimation = contextSafe(() => {
    const player_containers = Array.from(
      document.getElementsByClassName("poker-player-container")
    );
    gsap.to(player_containers, {
      scale: 1,
      duration: 0.6,
      borderWidth: 6,
    });
  });

  const profileDetailsAnimation = contextSafe(
    (detail_container: HTMLDivElement) => {
      gsap.fromTo(
        detail_container,
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
  );

  const cardOnHoverAnimation = contextSafe(
    (node: HTMLDivElement, event_type: "enter" | "leave") => {
      gsap.to(node, {
        scale: event_type == "enter" ? 0.8 : 0.4,
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  );

  return (
    <div ref={container_ref}>
      {show_buy_in_modal &&
        createPortal(
          <PokerBuyInDialog
            onModalCloseHandler={() => {
              profileAnimation();
              if (time_left > 0) {
                updateShowWaitingBanner(true);
              }
            }}
          />,
          document.getElementById(
            "poker-buy-in-dialog-container"
          ) as HTMLElement
        )}
      <StyledImageContainer // Table Wrapper
        $width="970px"
        $height="530px"
        $top="50%"
        $left="50%"
        $translateX="-50%"
        $translateY="-50%"
      >
        {poker_players.map((player, index) => {
          return (
            <PokerPlayer
              dealer_id={dealer_id}
              player={player}
              seat_index={index}
              key={`player-${index}`}
              bettor_id={bettor_id}
              show_hole_cards={show_hole_cards}
              profileAnimationHandler={profileDetailsAnimation}
              cardHoverHandler={
                player?.player_id == user_id ? cardOnHoverAnimation : undefined
              }
            />
          );
        })}

        <StyledSvgWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="913"
            height="448"
            fill="none"
            viewBox="0 0 913 448"
          >
            <path
              id="path"
              stroke="#fff"
              strokeWidth={0}
              d="M228.496 2.532c-52.667-.5-168.9 28.1-212.5 146.5s18.167 208 54.5 238c23.667 19.833 79.7 59.5 114.5 59.5h531c49-5 154.5-41.2 184.5-146s-5.5-174.667-27-196.5c-25.333-39.334-104.2-114.7-217-101.5"
            ></path>
          </svg>
        </StyledSvgWrapper>

        <StyledImageContainer
          $width="312px"
          $height="216px"
          $left="50%"
          $translateX="-50%"
          $top="-80px"
          $zIndex={1}
        >
          <StyledImage
            fill={true}
            src="/poker/poker-table/dealer.png"
            alt="dealer"
            sizes="(max-width: 1400px) 15vw"
          />
        </StyledImageContainer>

        <StyledImage
          src="/poker/poker-table/table.png"
          fill={true}
          alt="poker-table"
        />
        {deck.length && (
          <PokerDeck deck={deck} updateShowHoleCards={updateShowHoleCards} />
        )}

        <StyledCommunityCardsWrapper>
          {community_cards?.map(({ card_id, ...card }) => {
            return (
              <PokerCard
                scale={0.4}
                key={`card-${card_id}`}
                {...card}
                card_id={card_id}
                cardHoverHandler={cardOnHoverAnimation}
              />
            );
          })}
        </StyledCommunityCardsWrapper>
        {!!chips_in_pot && (
          <StyledChipsInPotWrapper>
            <Image
              id="chips-in-pot"
              data-flip-id="chips-winning-flip-animation"
              src="/poker/poker-player/poker-chips.png"
              width={16}
              height={16}
              alt="poker-chips"
            />

            <StyledChipsInPot>$ {chips_in_pot} K</StyledChipsInPot>
          </StyledChipsInPotWrapper>
        )}
        {user_id == bettor_id && (
          <PokerActionCta
            auth_player={auth_player as IPokerPlayer}
            key={no_of_community_cards}
            /**
             * so the key prop is being used here to reset
             * the state because if bettor id remains the
             * same in next round of betting then state
             * won't gonna reset and disabled will be true
             * and player won't be able to perform action
             */
          />
        )}
        <StyledPokerSliderWrapper id="poker-slider-container"></StyledPokerSliderWrapper>
      </StyledImageContainer>
    </div>
  );
};

export default withPokerTableFunctionality<{
  time_left: number;
  show_hole_cards: boolean;
  updateShowHoleCards: (val: boolean) => void;
  updateShowWaitingBanner: (val: boolean) => void;
}>(PokerTable);
