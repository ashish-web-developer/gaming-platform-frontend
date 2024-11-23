import { useEffect, useRef } from "react";
// type
import type { FC, ReactNode } from "react";

// styled components
import { StyledGameBannerWrapper } from "@/styles/components/login/game-banner/mobile-game-banner.style";

// gsap
import gsap from "gsap-trial";

const MobileGameBanner: FC<{
  main_color: string;
  banner_type: "cognimatch" | "poker";
  background_image: string;
  background_opacity: number;
  children: ReactNode;
}> = ({
  main_color,
  banner_type,
  background_image,
  background_opacity,
  children,
}) => {
  const container_ref = useRef<HTMLDivElement>(null);
  const gsap_context_ref = useRef<gsap.Context>();

  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
      self.add("bannerAnimation", (banner_type: "poker" | "cognimatch") => {
        gsap.to(container_ref.current, {
          rotate: banner_type == "poker" ? -5 : 5,
          duration: 1,
          delay: 1,
        });
      });
    }, container_ref);
    return () => {
      gsap_context_ref.current?.revert();
    };
  }, []);

  useEffect(() => {
    gsap_context_ref.current?.bannerAnimation(banner_type);
  }, [banner_type]);

  return (
    <StyledGameBannerWrapper
      ref={container_ref}
      $border_color={main_color}
      $background_image={background_image}
      $background_opacity={background_opacity}
    >
      {children}
    </StyledGameBannerWrapper>
  );
};
export default MobileGameBanner;
