import { useRef } from "react";
import { createPortal } from "react-dom";
// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledImageContainer,
  StyledImage,
  StyledSvgWrapper,
  StyledCommunityCardsWrapper,
  StyledActionCtaWrapper,
  StyledActionCta,
  StyledActionCtaIcons,
  StyledPokerSliderWrapper,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";
import PokerBuyInDialog from "@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog";
import PokerCard from "@/components/poker/poker-card/poker-card";

// hoc
import withPokerTableFunctionality from "@/hoc/poker/with-poker-table-functionality";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import {
  bettorId,
  showBuyInModal,
  triggerActionApi,
} from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import PokerSlider from "../poker-slider/poker-slider";

gsap.registerPlugin(MotionPathPlugin);
type IProps = {
  poker_players: Array<IPokerPlayer | null>;
  dealer_id: number | null;
  time_left: number;
  updateShowWaitingBanner: (val: boolean) => void;
};
const PokerTable: FC<IProps> = ({
  poker_players,
  dealer_id,
  time_left,
  updateShowWaitingBanner,
}) => {
  const dispatch = useAppDispatch();
  const container_ref = useRef<HTMLDivElement>(null);
  const player_containers_ref = useRef<Set<HTMLDivElement | null>>(new Set());
  const { id: user_id } = useAppSelector(User) || {};
  const bettor_id = useAppSelector(bettorId);
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const { contextSafe } = useGSAP(
    () => {
      const players_position = [
        0.897, 0.797, 0.693, 0.591, 0.495, 0.396, 0.29, 0.19, 0.09,
      ];
      const players_containers = Array.from(
        player_containers_ref.current.values()
      );
      gsap.set(players_containers, {
        scale: 1.5,
        borderWidth: 10,
      });
      /**
       * Animation will rotate the seat around the table in
       * random direction according the svg path
       */
      players_containers.forEach((container, index) => {
        gsap.fromTo(
          container,
          {
            opacity: 0,
          },
          {
            motionPath: {
              path: "#path",
              align: "#path",
              alignOrigin: [0.5, 0.5],
              start: gsap.utils.random(0, 1),
              end: players_position[index],
            },
            opacity: 1,
            duration: 3,
            delay: 0.1,
          }
        );
      });
    },
    { scope: container_ref }
  );

  /**
   * This animation will get
   * run on the close of buy in modal
   */
  const profileAnimation = contextSafe(() => {
    const animation = new Promise((resolve, reject) => {
      gsap
        .timeline({
          onComplete: resolve,
        })
        .to(Array.from(player_containers_ref.current.values()), {
          scale: 1,
          duration: 0.6,
          borderWidth: 6,
        });
    });
    return animation;
  });

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
              key={`players-${index}`}
              bettor_id={bettor_id}
              ref={(node) => {
                player_containers_ref.current.add(node);
                return () => {
                  player_containers_ref.current.delete(node);
                };
              }}
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
          />
        </StyledImageContainer>

        <StyledImage
          src="/poker/poker-table/table.png"
          fill={true}
          alt="poker-table"
        />
        <StyledCommunityCardsWrapper>
          {/* {new Array(5).fill(0).map((_, index) => {
            return <PokerCard key={`poker-${index}`} scale={0.5} />;
          })} */}
        </StyledCommunityCardsWrapper>
        {user_id == bettor_id && (
          <StyledActionCtaWrapper>
            <StyledActionCta
              onClick={() => {
                dispatch(
                  triggerActionApi({
                    action_type: "fold",
                    current_betted_amount: null,
                  })
                );
              }}
            >
              <StyledActionCtaIcons
                src="/poker/poker-table/action-cta-icons/fold.png"
                alt="fold-icon"
                width={20}
                height={20}
              />
              Fold
            </StyledActionCta>
            <StyledActionCta
              onClick={() => {
                dispatch(
                  triggerActionApi({
                    action_type: "check",
                    current_betted_amount: null,
                  })
                );
              }}
            >
              <StyledActionCtaIcons
                src="/poker/poker-table/action-cta-icons/check.png"
                alt="check-icon"
                width={20}
                height={20}
              />
              Check
            </StyledActionCta>
            <StyledActionCta>
              <StyledActionCtaIcons
                src="/poker/poker-table/action-cta-icons/raise.png"
                alt="raise-icon"
                width={20}
                height={20}
              />
              Raise
            </StyledActionCta>
          </StyledActionCtaWrapper>
        )}

        {/* {user_id == bettor_id && (
          <StyledPokerSliderWrapper>
            <PokerSlider />
          </StyledPokerSliderWrapper>
        )} */}
      </StyledImageContainer>
    </div>
  );
};

export default withPokerTableFunctionality<{
  time_left: number;
  updateShowWaitingBanner: (val: boolean) => void;
}>(PokerTable);
