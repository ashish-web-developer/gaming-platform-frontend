import { useEffect, useRef, useContext } from "react";
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

// provider
import UttranceProvider from "@/providers/UttranceProvider";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// context
import { UttranceContext } from "context";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { validationErrorList } from "@/store/slice/login.slice";

const ValidationTooltip: FC<{
  error: string | undefined;
}> = ({ error: fields_error }) => {
  const theme = useTheme() as ITheme;
  const uttrance_context = useContext(UttranceContext);
  const container_ref = useRef<HTMLDivElement>(null);
  const { error = fields_error } =
    useAppSelector(validationErrorList).filter(
      (error) => error.type == "auth_failed"
    )[0] ?? {};

  const { contextSafe } = useGSAP(() => {});

  const showValidationTooltip = contextSafe(() => {
    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: resolve,
        })
        .to("#error-info-girl-image", {
          display: "block",
          duration: 1,
          right: 0,
          ease: "expo",
        })
        .to("#error-info-tooltip", {
          display: "block",
          duration: 1,
          ease: "bounce",
        });
    });
  });

  const closeValidationTooltip = contextSafe(() => {
    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: resolve,
        })
        .set("#error-info-tooltip", {
          display: "none",
          ease: "back",
        })
        .to("#error-info-girl-image", {
          display: "none",
          duration: 1,
          right: -350,
          ease: "expo",
        });
    });
  });

  useEffect(() => {
    (async function () {
      if (uttrance_context.current && error) {
        uttrance_context.current.text = error;
        const uttrance = uttrance_context.current.uttrance;
        await showValidationTooltip();
        speechSynthesis.speak(uttrance);
      } else {
        speechSynthesis.cancel();
        await closeValidationTooltip();
      }
    })();
  }, [error]);
  return (
    <>
      {error && <UttranceProvider handleEnd={() => {}} />}
      <div ref={container_ref}>
        <StyledGirlImageWrapper
          id="error-info-girl-image"
          $width="329px"
          $height="618px"
          $right="-380px"
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
          $right="180px"
          $bottom="380px"
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
            {error}
          </StyledInfoTooltipText>
        </StyledInfoTooltip>
      </div>
    </>
  );
};
export default ValidationTooltip;
