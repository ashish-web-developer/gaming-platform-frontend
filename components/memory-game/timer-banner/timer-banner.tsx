// types
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledContainer,
  StyledPatternContainer,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledContentTop,
  StyledLogo,
  StyledSpan,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledCountDown,
  StyledOutlinedText,
} from "@/styles/components/memory-game/timer-banner/timer-banner.style";

// hoc
import withCountDown from "@/hoc/memory-game/with-count-down";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";

const PatternOne: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="207"
      height="153"
      fill="none"
      viewBox="0 0 207 153"
    >
      <path
        fill={color}
        d="M157.561 0H20.153C9.023 0 0 11.193 0 25v103c0 13.807 9.023 25 20.153 25h160.715c3.505 0 6.964-1.104 9.836-3.595 5.609-4.866 14.648-14.076 16.069-23.905 2.665-18.444-18.967-21.499-21.363-40-2.621-20.242 17.249-30.222 12.899-50-3.937-17.896-26.194-30.134-34.425-34.105C161.87.425 159.722 0 157.561 0z"
      ></path>
    </svg>
  );
};

const PatternTwo: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="229"
      height="153"
      fill="none"
      viewBox="0 0 229 153"
    >
      <path
        fill={color}
        d="M0 25C0 11.193 9.42 0 21.042 0h147.516c2.633 0 5.231.57 7.625 1.873 8.896 4.843 31.206 18.681 33.814 36.88 2.538 17.71-15.277 25.515-13.046 43.283 2.694 21.448 33.654 18.668 31.984 40.263-.734 9.482-8.265 19.384-13.605 25.296-3.333 3.69-7.796 5.405-12.351 5.405H21.042C9.42 153 0 141.807 0 128V25z"
      ></path>
    </svg>
  );
};

const TimerBanner: FC<{
  count_down: number;
}> = ({ count_down }) => {
  const theme = useTheme() as ITheme;
  const _user = useAppSelector(user);
  return (
    <StyledContainer>
      <StyledPatternContainer>
        <PatternTwo color={theme.palette.primary.light} />
      </StyledPatternContainer>
      <StyledPatternContainer>
        <PatternOne color={theme.palette.primary.dark} />
      </StyledPatternContainer>
      <StyledImageContainer>
        <StyledImage
          alt="girl"
          src={"/memory-game/timer-banner/timer-banner-girl.png"}
          fill={true}
          sizes="(max-width: 1400px) 20vw"
        />
      </StyledImageContainer>
      <StyledContentContainer>
        <StyledContentTop>
          <StyledLogo>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledLogo>
          <StyledVersusContainer>
            <StyledVersusText>
              {_user.name?.split(" ")[0]}{" "}
              <span style={{ color: theme.palette.primary.contrast }}>v/s</span>{" "}
              {/* {_gaming_user?.name?.split(" ")[0]} */}
            </StyledVersusText>
            <StyledVersusImage
              width={40}
              height={40}
              alt="chips"
              src="/memory-game/timer-banner/versus-container/chips.png"
            />
          </StyledVersusContainer>
        </StyledContentTop>
        <StyledCountDown>
          00:
          <StyledOutlinedText>
            {String(count_down).padStart(2, "0")}
          </StyledOutlinedText>
        </StyledCountDown>
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default withCountDown(TimerBanner);
