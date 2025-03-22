import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContentContainer,
  StyledGridColumnsContent,
  StyledRightContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledSubTitleSpan,
  StyledGameBannerContainer,
  StyledBannerGameLogo,
  StyledCornerVector,
  StyledPokerCardWrapper,
  StyledPlayCta,
  StyledPlayCtaVector,
  StyledLottiePlayerContainer,
} from "@/styles/components/login/welcome-login-screen/welcome-login-screen.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// vector
import LoginPlayCtaVector from "../vector/login-play-cta-vector";
import CornerVector from "@/components/login/vector/corner-vector";

// lottie
import Lottie from "react-lottie-player";
import JackOLaternJson from "@/public/login/welcome-login-screen/jack-o-latern.json";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

const WelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  const page_ref = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline()
        // spider web animation
        .fromTo(
          "#spider-web-vector",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        )
        .fromTo(
          "#web-vector",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          "<"
        )

        // logo animation
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
          }
        )
        .fromTo(
          ".subtitle-span",
          {
            opacity: 0,
            rotate: -60,
          },
          {
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.02,
          }
        )
        .addLabel("logo-animation-completion")
        .fromTo(
          "#main-image",
          {
            filter: "brightness(30%)",
          },
          {
            filter: "brightness(100%)",
            ease: "expo.in",
            duration: 1,
          },
          "logo-animation-completion-=1"
        )
        .fromTo(
          "#banner-container",
          {
            scale: 0.5,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "elastic.inOut",
            duration: 1.5,
          },
          "logo-animation-completion-=1"
        )
        .fromTo(
          "#main-cta",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: "expo",
          },
          "<"
        )
        .fromTo(
          "#haunted-car",
          {
            right: -500,
          },
          {
            right: -140,
            duration: 1,
          }
        );

      // jack o latern animation
      gsap.to("#jack-o-latern", {
        motionPath: {
          path: "M0.5 254C0.5 254 165.841 163.755 261.5 204C364.226 247.218 301.953 412.278 407 449.5C526.439 491.822 601.424 385.891 695.5 301C752.916 249.19 748.857 177.324 820 147C933.454 98.6406 1025.75 187.921 1105.5 282C1149.6 334.026 1177.2 369.745 1185 437.5C1195.13 525.522 1173.02 592.629 1105.5 650C1006.26 734.316 886.99 555.15 773.5 619C720.192 648.991 716.713 701.177 662.5 729.5C539.29 793.87 397.444 752.42 318.5 638C275.442 575.592 263.992 524.897 272 449.5C285.351 323.789 518.3 325.39 483 204C467.162 149.535 385.912 146.277 393 90C399.985 34.5393 452.944 20.5419 505.5 1.49998C609.127 -36.0463 663.336 93.4873 773.5 90C874.078 86.8161 915.34 -8.20043 1015.5 1.49998C1141.77 13.729 1269.5 204 1269.5 204",
        },
        repeat: -1,
        duration: 20,
        ease: "power1.in",
        yoyo: true,
      });

      /**
       * Finger print animation
       */
      gsap.fromTo(
        "#finger-prints-1",
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
          ease: "slow",
        }
      );
      gsap.fromTo(
        "#finger-prints-2",
        {
          scale: 0.3,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.3,
          ease: "steps(6)",
        }
      );
    },
    { scope: page_ref }
  );

  const mouseEventHandler = contextSafe((event_type: "enter" | "leave") => {
    gsap.to("#main-cta", {
      rotate: event_type == "enter" ? 2 : 0,
      scale: event_type == "enter" ? 1.05 : 1,
      duration: 1,
      ease: "elastic",
    });
  });

  return (
    <StyledPage ref={page_ref}>
      <StyledLottiePlayerContainer id="jack-o-latern" $top="0px" $left="0px">
        <Lottie
          loop
          play
          animationData={JackOLaternJson}
          style={{
            width: 144,
            height: 107,
          }}
        />
      </StyledLottiePlayerContainer>
      <StyledImageContainer
        $width="295px"
        $height="304px"
        $top="-90px"
        $right="-90px"
      >
        <StyledImage
          id="web-vector"
          src="/login/welcome-login-screen/web-vector.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width: 1400px) 15vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="311px"
        $height="308px"
        $left="0px"
        $top="0px"
      >
        <StyledImage
          id="spider-web-vector"
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width: 1400px) 15vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="589px"
        $height="442px"
        $bottom="-50px"
        $right="-140px"
        id="haunted-car"
      >
        <StyledImage
          src="/login/welcome-login-screen/haunted-car.png"
          fill={true}
          alt="haunted car"
          sizes="(max-width: 1400px) 30vw"
        />
      </StyledImageContainer>
      <StyledContentContainer>
        <StyledImageContainer
          $width="138px"
          $height="114px"
          $top="10px"
          $left="50%"
        >
          <StyledImage
            id="finger-prints-1"
            src="/login/welcome-login-screen/finger-prints-1.png"
            fill={true}
            alt="finger-prints-1"
            sizes="(max-width: 1400px) 15vw"
          />
        </StyledImageContainer>
        <StyledImageContainer
          $width="76px"
          $height="83px"
          $bottom="50%"
          $right="0px"
        >
          <StyledImage
            id="finger-prints-2"
            src="/login/welcome-login-screen/finger-prints-2.png"
            fill={true}
            alt="finger-prints-2"
            sizes="(max-width: 1400px) 10vw"
          />
        </StyledImageContainer>
        <StyledGridColumnsContent>
          <StyledImageContainer
            $width="660px"
            $height="840px"
            $bottom="-90px"
            $left="-72px"
          >
            <StyledImage
              id="main-image"
              src="/login/welcome-login-screen/main-image.png"
              fill={true}
              alt="main image"
              sizes="(max-width: 1400px) 60vw"
              priority={true}
            />
          </StyledImageContainer>
        </StyledGridColumnsContent>
        <StyledGridColumnsContent>
          <StyledRightContentContainer>
            <StyledLogoContainer>
              <StyledLogo>
                {"Fortune Realm".split("").map((char, index) => {
                  return (
                    <span key={`logo-${index}`} className="logo-span">
                      {char}
                    </span>
                  );
                })}
              </StyledLogo>
              <StyledSubTitle>
                {"Your ultimate destination for thrilling casino games"
                  .split("")
                  .map((char, index) => {
                    return (
                      <StyledSubTitleSpan
                        className="subtitle-span"
                        key={`subtitle-${index}`}
                      >
                        {char == " " ? "\u00A0" : char}
                      </StyledSubTitleSpan>
                    );
                  })}
              </StyledSubTitle>
            </StyledLogoContainer>
            <StyledGameBannerContainer id="banner-container">
              <StyledCornerVector $rotate="0deg" $left="0px" $top="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="90deg" $right="0px" $top="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="180deg" $right="0px" $bottom="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="270deg" $bottom="0px" $left="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledImageContainer
                $width="215px"
                $height="299px"
                $left="50%"
                $bottom="0px"
                $translateX="-50%"
              >
                <StyledImage
                  src="/chat/invite-dialog/poker-girl-image.png"
                  alt="poker-girl"
                  fill={true}
                  sizes="(max-width: 1400px) 20vw"
                />
              </StyledImageContainer>
              <StyledBannerGameLogo>
                Texas hold'em <br />
                showdown
              </StyledBannerGameLogo>
              <ThemeProvider theme={PokerTheme}>
                <StyledPokerCardWrapper
                  $right="32px"
                  $top="-24px"
                  $rotate="15deg"
                >
                  <PokerCard card_id="1" suit="club" rank="K" scale={0.4} />
                </StyledPokerCardWrapper>
                <StyledPokerCardWrapper
                  $left="40px"
                  $bottom="-12px"
                  $rotate="-15deg"
                >
                  <PokerCard card_id="2" suit="spade" rank="Q" scale={0.4} />
                </StyledPokerCardWrapper>
              </ThemeProvider>
            </StyledGameBannerContainer>
            <StyledPlayCta
              id="main-cta"
              onMouseEnter={() => mouseEventHandler("enter")}
              onMouseLeave={() => mouseEventHandler("leave")}
              onClick={() => updateShowLogin(true)}
            >
              <StyledPlayCtaVector>
                <LoginPlayCtaVector is_mobile={false} />
              </StyledPlayCtaVector>
            </StyledPlayCta>
          </StyledRightContentContainer>
        </StyledGridColumnsContent>
      </StyledContentContainer>
    </StyledPage>
  );
};

export default WelcomeLoginScreen;
