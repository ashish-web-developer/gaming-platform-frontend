// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// styled components
import {
  StyledTooltipDrawer,
  StyledTooltipContainer,
  StyledTopBackgroundContainer,
  StyledTopBackground,
  StyledVolumeCta,
  StyledContent,
  StyledHeader,
  StyledPara,
  StyledTrofyImageContainer,
  StyledTrofyImage,
  StyledBottomCta,
  StyledNavIconContainer,
  StyledBackButton,
  StyledNavCta,
  StyledBackIconContainer,
} from "@/styles/components/memory-game/help-tooltip/mobile/mobile-help-tooltip.style";

// hoc
import withHelpTooltipFunctionality from "@/hoc/memory-game/with-help-tooltip-funtionality";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";

// icons
import VolumeOffIcon from "@/components/memory-game/help-tooltip/icons/volume-off";
import VolumeOnIcon from "@/components/memory-game/help-tooltip/icons/volume-on";
import PrevIcon from "@/components/memory-game/help-tooltip/icons/prev";
import NextIcon from "@/components/memory-game/help-tooltip/icons/next";
import BackIcon from "@/components/memory-game/help-tooltip/icons/back";

type IProps = {
  is_open: boolean;
  play_audio: boolean;
  help_tooltip_text: [string, string] | null;
  current_rule_index: number;
  handlePlayAudio: () => void;
  closeHelpTooltip: () => void;
  updateRuleIndex: (index: number) => void;
};

const MobileHelpTooltip: FC<IProps> = ({
  is_open,
  play_audio,
  help_tooltip_text,
  current_rule_index,
  handlePlayAudio,
  closeHelpTooltip,
  updateRuleIndex,
}) => {
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);

  return (
    <StyledTooltipDrawer open={is_open}>
      <StyledTooltipContainer>
        <StyledTopBackgroundContainer>
          <StyledTopBackground
            fill={true}
            alt="girl"
            src={"/memory-game/help-tooltip/mobile/top-background.svg"}
            sizes="(max-width: 1400px) 10vw"
          />
        </StyledTopBackgroundContainer>
        <StyledVolumeCta onClick={handlePlayAudio}>
          {play_audio ? (
            <VolumeOffIcon size={30} color={"#fff"} />
          ) : (
            <VolumeOnIcon size={30} color={"#fff"} />
          )}
        </StyledVolumeCta>
        <StyledContent>
          <StyledHeader>
            {help_tooltip_text ? help_tooltip_text[0] : ""}
          </StyledHeader>
          <StyledPara>
            {help_tooltip_text ? help_tooltip_text[1] : ""}
          </StyledPara>
          <StyledTrofyImageContainer $showBackground={_mode == "light"}>
            <StyledTrofyImage
              alt="banner"
              fill={true}
              src="/memory-game/help-tooltip/mobile/banner-image.png"
              sizes="(max-width: 1400px) 10vw"
            />
          </StyledTrofyImageContainer>
        </StyledContent>
        <StyledBottomCta>
          <StyledBackButton onClick={closeHelpTooltip}>
            <StyledBackIconContainer>
              <BackIcon
                width={12}
                height={22}
                color={theme.palette.primary.dark}
              />
            </StyledBackIconContainer>
            Go Back
          </StyledBackButton>
          <StyledNavIconContainer>
            <StyledNavCta
              onClick={() => {
                if (current_rule_index >= 1) {
                  updateRuleIndex(current_rule_index - 1);
                }
              }}
            >
              <PrevIcon size={50} color={theme.palette.primary.dark} />
            </StyledNavCta>
            <StyledNavCta
              onClick={() => {
                if (current_rule_index <= 6) {
                  updateRuleIndex(current_rule_index + 1);
                }
              }}
            >
              <NextIcon size={50} color={theme.palette.primary.dark} />
            </StyledNavCta>
          </StyledNavIconContainer>
        </StyledBottomCta>
      </StyledTooltipContainer>
    </StyledTooltipDrawer>
  );
};
export default withHelpTooltipFunctionality(MobileHelpTooltip);
