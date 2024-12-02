import { useRef, useEffect } from "react";
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
} from "@/styles/components/login/welcome-login-screen/mobile-welcome-login-screen.style";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// vector
import LoginPlayCtaVector from "@/components/login/vector/login-play-cta-vector";

// gsap
import gsap from "gsap";

const MobileWelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  const container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap_context = gsap.context(() => {
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
    }, container_ref);
    return () => {
      gsap_context.revert();
    };
  }, []);

  // logo animation
  useEffect(() => {
    const gsap_context = gsap.context(() => {
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
    }, container_ref);
    return () => {
      gsap_context.revert();
    };
  }, []);
  return (
    <StyledPage ref={container_ref}>
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
        <StyledPlayCta onClick={() => updateShowLogin(true)}>
          <StyledPlayCtaVector>
            <LoginPlayCtaVector is_mobile={true} />
          </StyledPlayCtaVector>
        </StyledPlayCta>
      </StyledBottomShadow>
    </StyledPage>
  );
};
export default MobileWelcomeLoginScreen;
