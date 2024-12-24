import { useRef } from "react";
import { createPortal } from "react-dom";
// types
import type { FC } from "react";

// styled components
import {
  StyledImageContainer,
  StyledImage,
  StyledSvgWrapper,
  StyledCommunityCardsWrapper,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerPlayer from "@/components/poker/poker-player-seat/poker-player";
import PokerBuyInDialog from "@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog";
import PokerCard from "@/components/poker/poker-card/poker-card";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { showBuyInModal } from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const PokerTable: FC = () => {
  const container_ref = useRef<HTMLDivElement>(null);
  const player_containers_ref = useRef<Set<HTMLDivElement | null>>(new Set());
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const { contextSafe } = useGSAP(
    () => {
      const players_position = [
        0.09, 0.19, 0.29, 0.396, 0.495, 0.591, 0.693, 0.797, 0.897,
      ];
      const players_containers = Array.from(
        player_containers_ref.current.values()
      );
      gsap.set(players_containers, {
        scale: 1.5,
        borderWidth: 10,
      });
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
        })

        .fromTo(
          Array.from(player_containers_ref.current.values()).map(
            (container) => container?.firstChild
          ),
          {
            scale: 1.3,
          },
          {
            opacity: 1,
            scale: 1,
            stagger: {
              from: "center",
              amount: 1,
            },
            duration: 1,
            ease: "elastic.out",
          },
          "-=0.3"
        );
    });
    return animation;
  });

  return (
    <div ref={container_ref}>
      {show_buy_in_modal &&
        createPortal(
          <PokerBuyInDialog onModalCloseAnimation={profileAnimation} />,
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
        {new Array(9).fill(0).map((val, index) => {
          return (
            <PokerPlayer
              key={`players-${index}`}
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
        <StyledCommunityCardsWrapper>
          {new Array(5).fill(0).map(() => {
            return <PokerCard scale={0.5} />;
          })}
        </StyledCommunityCardsWrapper>
        <StyledImage
          src="/poker/poker-table/table.png"
          fill={true}
          alt="poker-table"
        />
      </StyledImageContainer>
    </div>
  );
};

export default PokerTable;
