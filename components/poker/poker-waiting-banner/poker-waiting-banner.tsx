import { useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// theme
import { useTheme } from "styled-components";

// local components
import PokerTimer from "@/components/poker/poker-timer/poker-timer";

// styled components
import {
  StyledAnimationContainer,
  StyledVectorPosition,
  StyledWaitingBannerWrapper,
  StyledWaitingBannerContent,
  StyledInfoText,
} from "@/styles/components/poker/poker-waiting-banner/poker-waiting-banner.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import { dealerId, dealHandApi } from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SvgVector: FC<{
  size: number;
  stroke_color: string;
  stroke_width: number;
}> = ({ size, stroke_color, stroke_width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox={`0 0 ${size} ${size}`}
  >
    <path
      stroke={stroke_color}
      strokeWidth={stroke_width}
      d="M2 102V18C2 9.163 9.163 2 18 2h84"
    ></path>
  </svg>
);

const PokerWaitingBanner: FC<{
  initial_count: number;
  updateShowWaitigBanner: (val: boolean) => void;
}> = ({ initial_count, updateShowWaitigBanner }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const animation_ref = useRef<HTMLDivElement>(null);
  const { id: user_id } = useAppSelector(User) ?? {};
  const dealer_id = useAppSelector(dealerId);

  useGSAP(() => {
    gsap.from(animation_ref.current, {
      scale: 1.5,
      duration: 1.5,
      ease: "bounce.inOut",
    });
  });
  return (
    <>
      <StyledAnimationContainer ref={animation_ref}>
        <StyledVectorPosition $top="0px" $left="0px" $rotate="0deg">
          <SvgVector
            size={100}
            stroke_color={theme.palette.success.main}
            stroke_width={4}
          />
        </StyledVectorPosition>
        <StyledVectorPosition $bottom="0px" $left="0px" $rotate="-90deg">
          <SvgVector
            size={100}
            stroke_color={theme.palette.success.main}
            stroke_width={4}
          />
        </StyledVectorPosition>

        <StyledVectorPosition $bottom="0px" $right="0px" $rotate="180deg">
          <SvgVector
            size={100}
            stroke_color={theme.palette.success.main}
            stroke_width={4}
          />
        </StyledVectorPosition>
        <StyledVectorPosition $top="0px" $right="0px" $rotate="90deg">
          <SvgVector
            size={100}
            stroke_color={theme.palette.success.main}
            stroke_width={4}
          />
        </StyledVectorPosition>
      </StyledAnimationContainer>
      <StyledWaitingBannerWrapper>
        <StyledWaitingBannerContent>
          <PokerTimer
            initial_count={initial_count}
            play_ticker_media={false}
            handleOnFinish={() => {
              updateShowWaitigBanner(false);
              user_id == dealer_id && dispatch(dealHandApi());
            }}
          />
          <StyledInfoText>
            Waiting for other <br />
            players to join...
          </StyledInfoText>
        </StyledWaitingBannerContent>
      </StyledWaitingBannerWrapper>
    </>
  );
};
export default PokerWaitingBanner;
