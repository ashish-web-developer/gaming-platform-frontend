import { useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// theme
import { useTheme } from "styled-components";

// local components
import {
  StyledPage,
  StyledContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledPlatformLogo,
  StyledGameLogo,
  StyledSuitWrapper,
  StyledCountDown,
} from "@/styles/components/poker/welcome-poker-screen/welcome-poker-screen.style";

// hoc
import withCountDownFunctionality from "@/hoc/common/with-count-down-functionality";

// icons
import Suit from "@/components/poker/icons/suit";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WelcomePokerScreen: FC<{
  updateShowWelcomeScreen: (show: boolean) => void;
}> = ({ updateShowWelcomeScreen }) => {
  const theme = useTheme() as ITheme;
  const page_ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // background animation
      gsap.set("#poker-background", {
        zIndex: 0,
      });
      gsap.timeline().fromTo(
        "#poker-background",
        {
          scale: 1,
        },
        {
          scale: 1.5,
          duration: 8,
        }
      );

      // logo and main image animation
      gsap
        .timeline()
        .fromTo(
          "#main-image",
          {
            scale: 0.5,
          },
          {
            scale: 1,
            duration: 1,
          }
        )
        .fromTo(
          ".logo-span",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.05,
              from: "random",
              ease: "steps(6)",
            },
          },
          "-=0.5"
        );
    },
    { scope: page_ref }
  );

  return (
    <StyledPage ref={page_ref}>
      <StyledImage
        id="poker-background"
        $objectFit="cover"
        src="/poker/diamond-background.png"
        fill={true}
        alt="poker-background"
      />
      <StyledContentContainer>
        <StyledSuitWrapper $bottom="270px" $left="100px">
          <Suit
            size={60}
            stroke={theme.palette.secondary.main}
            stroke_width={0.5}
            suit_type="heart"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $top="85px" $left="240px">
          <Suit
            size={60}
            stroke={theme.palette.secondary.main}
            stroke_width={0.5}
            suit_type="club"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $bottom="300px" $right="100px">
          <Suit
            size={60}
            stroke={theme.palette.secondary.main}
            stroke_width={0.5}
            suit_type="diamond"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $bottom="160px" $right="360px">
          <Suit
            size={60}
            stroke={theme.palette.secondary.main}
            stroke_width={0.5}
            suit_type="spade"
          />
        </StyledSuitWrapper>
        <WithCountDown
          updateShowWelcomeScreen={updateShowWelcomeScreen}
          initial_count={5}
        />
        <StyledImageContainer
          $width="602px"
          $height="834px"
          $bottom="-36px"
          $left="50%"
          $translateX="-50%"
        >
          <StyledImage
            src="/poker/welcome-poker-screen/main-image.png"
            alt="main-image"
            fill={true}
            id="main-image"
            sizes="(max-width: 1400px) 50vw"
          />
        </StyledImageContainer>
        <StyledImageContainer
          $width="250px"
          $height="250px"
          $bottom="48px"
          $left="0px"
        >
          <StyledImage
            src="/poker/welcome-poker-screen/trophy.png"
            alt="trophy"
            fill={true}
            sizes="(max-width: 1400px) 15vw"
          />
        </StyledImageContainer>
        <StyledLogoContainer>
          <StyledPlatformLogo>
            {"Fortune Realm".split("").map((char, index) => {
              return (
                <span key={`logo-${index}`} className="logo-span">
                  {char}
                </span>
              );
            })}
          </StyledPlatformLogo>
          <StyledGameLogo>
            Texas Hold'em <br /> Showdown
          </StyledGameLogo>
        </StyledLogoContainer>
      </StyledContentContainer>
    </StyledPage>
  );
};
type ICountDownProps = {
  count: number;
  is_finished: boolean;
  updateShowWelcomeScreen: (show: boolean) => void;
};
function CountDown({
  count,
  is_finished,
  updateShowWelcomeScreen,
}: ICountDownProps) {
  const counter_ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    is_finished && updateShowWelcomeScreen(false);
  }, [is_finished]);
  useGSAP(
    () => {
      gsap.from(counter_ref.current, {
        scale: 2,
        duration: 0.3,
        ease: "bounce",
      });
    },
    { revertOnUpdate: true, dependencies: [count] }
  );
  return <StyledCountDown ref={counter_ref}>{count}</StyledCountDown>;
}
const WithCountDown = withCountDownFunctionality<{
  updateShowWelcomeScreen: (show: boolean) => void;
  initial_count: number;
}>(CountDown);

export default WelcomePokerScreen;
