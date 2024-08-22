import { useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledHelpTooltipContainer,
  StyledHelpTooltipImageContainer,
  StyledImage,
  StyledToolTipContainer,
  StyledVolumeContainer,
  StyledVolumeCta,
  StyledTooltip,
  StyledTooltipHeader,
  StyledTooltipPara,
  StyledCloseIconCta,
  StyledNavContainer,
  StyledIconCta,
} from "@/styles/components/memory-game/help-tooltip/help-tooltip.style";
// hoc
import withHelpTooltipFunctionality from "@/hoc/memory-game/with-help-tooltip-funtionality";

// styled theme
import { useTheme } from "styled-components";

// icons
import CloseIcon from "@/components/memory-game/help-tooltip/icons/close";
import PrevIcon from "@/components/memory-game/help-tooltip/icons/prev";
import NextIcon from "@/components/memory-game/help-tooltip/icons/next";
import VolumeOffIcon from "@/components/memory-game/help-tooltip/icons/volume-off";
import VolumeOnIcon from "@/components/memory-game/help-tooltip/icons/volume-on";

// gsap
import gsap from "gsap";

type IProps = {
  is_open: boolean;
  play_audio: boolean;
  help_tooltip_text: [string, string] | null;
  current_rule_index: number;
  handlePlayAudio: () => void;
  closeHelpTooltip: () => void;
  updateRuleIndex: (index: number) => void;
};
const HelpTooltip: FC<IProps> = ({
  is_open,
  play_audio,
  help_tooltip_text,
  current_rule_index,
  handlePlayAudio,
  closeHelpTooltip,
  updateRuleIndex,
}) => {
  const theme = useTheme() as ITheme;
  const gsap_context_ref = useRef<gsap.Context>();
  const help_tooltip_container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
      gsap.from(help_tooltip_container_ref.current, {
        x: 750,
        duration: 0.7,
        ease: "power4.out",
      });
      self.add("closeAnimation", () => {
        return new Promise((resolve) => {
          gsap.to(help_tooltip_container_ref.current, {
            x: 750,
            duration: 0.7,
            ease: "power4.out",
            onComplete: resolve,
          });
        });
      });
    });
    return () => {
      gsap_context_ref.current?.revert();
    };
  }, []);

  return (
    <StyledHelpTooltipContainer ref={help_tooltip_container_ref}>
      <StyledHelpTooltipImageContainer>
        <StyledImage
          alt="girl"
          fill={true}
          src={"/memory-game/help-tooltip/help-tooltip-girl.png"}
        />
      </StyledHelpTooltipImageContainer>
      <StyledToolTipContainer>
        <StyledVolumeContainer>
          <StyledVolumeCta onClick={handlePlayAudio}>
            {play_audio ? (
              <VolumeOffIcon size={20} color={theme.palette.primary.light} />
            ) : (
              <VolumeOnIcon size={20} color={theme.palette.primary.light} />
            )}
          </StyledVolumeCta>
        </StyledVolumeContainer>
        <StyledTooltip>
          <StyledCloseIconCta
            onClick={async () => {
              await gsap_context_ref.current?.closeAnimation();
              closeHelpTooltip();
            }}
          >
            <CloseIcon color={theme.palette.primary.light} size={33} />
          </StyledCloseIconCta>
          <StyledNavContainer>
            <StyledIconCta
              onClick={() => {
                updateRuleIndex(current_rule_index - 1);
              }}
            >
              <PrevIcon color={theme.palette.primary.light} size={33} />
            </StyledIconCta>
            <StyledIconCta
              onClick={() => {
                updateRuleIndex(current_rule_index + 1);
              }}
            >
              <NextIcon color={theme.palette.primary.light} size={33} />
            </StyledIconCta>
          </StyledNavContainer>
          <StyledTooltipHeader>
            {help_tooltip_text && help_tooltip_text[0]}
          </StyledTooltipHeader>
          <StyledTooltipPara>
            {help_tooltip_text && help_tooltip_text[1]}
          </StyledTooltipPara>
        </StyledTooltip>
      </StyledToolTipContainer>
    </StyledHelpTooltipContainer>
  );
};
export default withHelpTooltipFunctionality(HelpTooltip);
