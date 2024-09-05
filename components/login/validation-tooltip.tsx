import { useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";

// styled components
import {
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledInfoTooltip,
  StyledInfoTooltipText,
} from "@/styles/components/login/validation-tooltip.style";

// theme
import { useTheme } from "styled-components";

// vector
import { ErrorInfoTooltipVector } from "@/components/login/vector/info-tooltip-vector";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { validatorError } from "@/store/slice/login.slice";

// gsap
import gsap from "gsap";

const ValidationTooltip: FC = () => {
  const theme = useTheme() as ITheme;
  const validator_error = useAppSelector(validatorError);
  const container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap_context = gsap.context((self) => {
      self.add("showValidationTooltip", () => {
        gsap
          .timeline()
          .to("#error-info-girl-image", {
            display: "block",
            duration: 1,
            right: -120,
            ease: "expo",
          })
          .to("#error-info-tooltip", {
            display: "block",
            duration: 1,
            ease: "bounce",
          });
      });
      self.add("closeValidationTooltip", () => {
        gsap
          .timeline()
          .to("#error-info-girl-image", {
            display: "none",
            duration: 1,
            right: -300,
            ease: "expo",
          })
          .to("#error-info-tooltip", {
            display: "none",
            duration: 1,
            ease: "back",
          });
      });
    }, container_ref);
    validator_error && gsap_context.showValidationTooltip();
    validator_error || gsap_context.closeValidationTooltip();
    return () => {
      gsap_context.revert();
    };
  }, [validator_error]);
  return (
    <div ref={container_ref}>
      <StyledGirlImageWrapper
        id="error-info-girl-image"
        $width="723px"
        $height="682px"
        $right="-300px"
        $display="none"
      >
        <StyledGirlImage
          fill={true}
          alt="error-girl"
          src="/login/error-info-girl.png"
          sizes="(max-width: 1400px) 25vw"
        />
      </StyledGirlImageWrapper>
      <StyledInfoTooltip
        $right="150px"
        $bottom="440px"
        id="error-info-tooltip"
        $display="none"
      >
        <ErrorInfoTooltipVector />
        <StyledInfoTooltipText
          $top="40px"
          $left="30px"
          $font_size="1.2rem"
          $rotate="6deg"
          $color={theme.palette.error.main}
        >
          {validator_error ?? ""}
        </StyledInfoTooltipText>
      </StyledInfoTooltip>
    </div>
  );
};
export default ValidationTooltip;
