import { useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainText,
  StyledSpan,
  StyledStarContainer,
  StyledContent,
} from "@/styles/components/memory-game/welcome-banner/mobile/mobile-welcome-banner.style";
import Star from "@/components/memory-game/welcome-banner/icons/star";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";

// gsap
import gsap from "gsap";

const MobileWelcomeBanner: FC = () => {
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  const welcome_banner_ref = useRef<HTMLDivElement>(null);
  const stars_ref = useRef<Map<string, SVGSVGElement>>();
  const stars = [
    {
      id: "star_1",
      color: "#080F0F",
    },
    {
      id: "star_2",
      color: "#FFFFFF",
    },
    {
      id: "star_3",
      color: "#16C172",
    },
  ];
  const get_stars_map = () => {
    if (!stars_ref.current) {
      stars_ref.current = new Map();
    }
    return stars_ref.current;
  };

  useEffect(() => {
    console.log(stars_ref);
    const gsap_context = gsap.context(() => {
      gsap.to(welcome_banner_ref.current, {
        rotate: -5,
        duration: 0.5,
        ease: "power4.out",
      });
      stars_ref.current?.forEach((element) => {
        gsap.from(element, {
          duration: 0.5,
          ease: "power4.out",
          attr: {
            width: 30,
            height: 30,
          },
        });
      });
    });
    return () => {
      gsap_context.revert();
    };
  }, []);
  return (
    <StyledContainer>
      <StyledDottedContainer $mode={_mode}>
        <StyledWelcomeBannerContainer ref={welcome_banner_ref}>
          <StyledMainText $rotate={"90deg"} $bottom="20%" $left={"-20px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>
          <StyledMainText $right={"10px"} $top={"5px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>
          <StyledStarContainer>
            {stars.map(({ id, color }) => {
              return (
                <Star
                  ref={(node) => {
                    const stars_map = get_stars_map();
                    if (node) {
                      stars_map.set(id, node);
                    } else {
                      stars_map.delete(id);
                    }
                  }}
                  key={id}
                  size={20}
                  color={color}
                />
              );
            })}
          </StyledStarContainer>

          <StyledContent>
            &ldquo;CogniMatch&rdquo; is a captivating memory game designed to
            boost your cognitive skills. Flip cards, match pairs, and enhance
            your memory in a fun and challenging way. Perfect for all ages!
          </StyledContent>
        </StyledWelcomeBannerContainer>
      </StyledDottedContainer>
    </StyledContainer>
  );
};

export default MobileWelcomeBanner;
