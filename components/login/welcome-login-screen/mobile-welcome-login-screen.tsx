import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledPokerCardWrapper,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledSubTitleSpan,
  StyledBottomShadow,
  StyledPlayCta,
  StyledPlayCtaVector,
  StyledLottiePlayerContainer,
} from "@/styles/components/login/welcome-login-screen/mobile-welcome-login-screen.style";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// vector
import LoginPlayCtaVector from "@/components/login/vector/login-play-cta-vector";

// lottie
import Lottie from "react-lottie-player";
import JackOLaternJson from "@/public/login/welcome-login-screen/jack-o-latern.json";

// gsap
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin);

const MobileWelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  const container_ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      gsap
        .timeline()
        .addLabel("start")
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
        .fromTo(
          "#main-image",
          {
            filter: "brightness(30%)",
          },
          {
            filter: "brightness(100%)",
            ease: "expo.in",
            duration: 1,
          }
        );

      // jack o latern animation
      gsap.to("#jack-o-latern", {
        motionPath: {
          path: "M39.5 25.5C84.1667 13.6666 171.3 15.9 162.5 119.5C151.5 249 427.5 163 327.5 397.5C227.5 632 163.5 660 101.5 644.5C39.5 629 -48 552 34 436C116 320 214.5 449 225.5 276.5C236.5 104 211.5 1.99998 280 0.999985C348.5 -1.51433e-05 388 40 346 119.5C304 199 20 209.5 52.5 356.5C85 503.5 199.5 329.5 254.5 471.5C309.5 613.5 307 698.5 187 748.5",
        },
        repeat: -1,
        duration: 20,
        ease: "power1.in",
        yoyo: true,
      });

      // logo animation
      gsap
        .timeline()
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
        );
    },
    { scope: container_ref }
  );

  return (
    <StyledPage ref={container_ref}>
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
        $width="207px"
        $height="182px"
        $left="-14px"
        $top="0px"
      >
        <StyledImage
          id="spider-web-vector"
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width:600px) 30vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="157px"
        $height="168px"
        $top="-60px"
        $right="-60px"
      >
        <StyledImage
          id="web-vector"
          src="/login/welcome-login-screen/web-vector.png"
          fill={true}
          alt="spider-web"
          sizes="(max-width:600px) 30vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="90px"
        $height="76px"
        $top="60px"
        $left="50%"
      >
        <StyledImage
          id="finger-prints-1"
          src="/login/welcome-login-screen/finger-prints-1.png"
          fill={true}
          alt="finger-prints-1"
          sizes="(max-width:600px) 20vw"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="38px"
        $height="38px"
        $bottom="60%"
        $right="42px"
      >
        <StyledImage
          id="finger-prints-2"
          src="/login/welcome-login-screen/finger-prints-2.png"
          fill={true}
          alt="finger-prints-2"
          sizes="(max-width:600px) 20vw"
        />
      </StyledImageContainer>
      <ThemeProvider theme={PokerTheme}>
        <StyledPokerCardWrapper $left="32px" $top="180px" $rotate="-17deg">
          <PokerCard rank="K" suit="club" />
        </StyledPokerCardWrapper>
        <StyledPokerCardWrapper $right="36px" $top="130px" $rotate="11deg">
          <PokerCard rank="J" suit="diamond" />
        </StyledPokerCardWrapper>
      </ThemeProvider>
      <StyledImageContainer
        $width="513px"
        $height="649px"
        $bottom="-60px"
        $left="50%"
        $translateX="-50%"
      >
        <StyledImage
          src="/login/welcome-login-screen/main-image.png"
          fill={true}
          alt="main image"
          priority={true}
          id="main-image"
          sizes="(max-width:600px) 60vw"
        />
      </StyledImageContainer>
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
                  key={`subtitle-${index}`}
                  className="subtitle-span"
                >
                  {char == " " ? "\u00A0" : char}
                </StyledSubTitleSpan>
              );
            })}
        </StyledSubTitle>
      </StyledLogoContainer>
      <StyledBottomShadow>
        <StyledPlayCta onClick={() => updateShowLogin(true)} id="main-cta">
          <StyledPlayCtaVector>
            <LoginPlayCtaVector is_mobile={true} />
          </StyledPlayCtaVector>
        </StyledPlayCta>
      </StyledBottomShadow>
    </StyledPage>
  );
};
export default MobileWelcomeLoginScreen;
