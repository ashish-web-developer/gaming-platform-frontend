import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// styled components
import {
  StyledPokerActionCtaWrapper,
  StyledActionCta,
} from "@/styles/components/poker/poker-player-seat/mobile/mobile-poker-action-cta.style";

// theme
import { useTheme } from "styled-components";

const MobilePokerActionCta: FC = () => {
  const theme = useTheme() as ITheme;
  return (
    <StyledPokerActionCtaWrapper>
      <StyledActionCta $color={theme.palette.warning.main}>
        Fold
      </StyledActionCta>
      <StyledActionCta $color={"#fff"}>Check</StyledActionCta>
      <StyledActionCta $color={theme.palette.success.main}>
        Call 60K
      </StyledActionCta>
    </StyledPokerActionCtaWrapper>
  );
};
export default MobilePokerActionCta;
