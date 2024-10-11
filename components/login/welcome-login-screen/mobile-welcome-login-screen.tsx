import { useEffect, useRef } from "react";
// types
import type { FC } from "react";

// local components
import MobileGameBanner from "@/components/login/game-banner/mobile-game-banner";

// styled components
import {
  StyledPage,
  StyledBottomContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSubtitle,
  StyledCta,
  StyledCtaTextWrapper,
} from "@/styles/components/login/welcome-login-screen/mobile-welcome-login-screen.style";

// vector
import CtaVector from "@/components/login/vector/cta-vector";

// gsap
import gsap from "gsap-trial";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(SplitText);

const MobileWelcomeLoginScreen: FC = () => {
  const container_ref = useRef<HTMLDivElement>(null);
  const logo_ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const split_text = new SplitText(logo_ref.current, { type: "words,chars" });
    const gsap_context = gsap.context(() => {
      gsap
        .timeline()
        .from(split_text.chars, {
          delay: 1,
          duration: 1,
          scale: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => {
            split_text.revert();
          },
        })
        .to(logo_ref.current, {
          rotate: -5,
          duration: 0.6,
          ease: "bounce",
        })
        .to(
          ".subtitle",
          {
            rotate: -5,
            duration: 0.6,
            ease: "bounce",
          },
          "<"
        )
        .to(
          ".unlock-cta",
          {
            rotate: 0,
            duration: 0.6,
            ease: "bounce",
          },
          "<"
        );
    }, container_ref);
    return () => {
      split_text.revert();
      gsap_context.revert();
    };
  }, []);
  return (
    <StyledPage ref={container_ref}>
      <MobileGameBanner
        banner_type="cognimatch"
        main_color={"#F42C04"}
        background_image="url(/memory-game/background/dark-background.png)"
        background_opacity={0.2}
      />
      <MobileGameBanner
        banner_type="poker"
        main_color={"#F5D547"}
        background_image="url(/poker/background.jpg)"
        background_opacity={1}
      />
      <StyledBottomContentContainer>
        <StyledLogoContainer>
          <StyledLogo ref={logo_ref}>Fortune Realm</StyledLogo>
          <StyledLogoSubtitle className="subtitle">
            Your Ultimate destination for thrilling casino games
          </StyledLogoSubtitle>
        </StyledLogoContainer>
        <StyledCta className="unlock-cta" onClick={() => {}}>
          <CtaVector />
          <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
        </StyledCta>
      </StyledBottomContentContainer>
    </StyledPage>
  );
};
export default MobileWelcomeLoginScreen;
