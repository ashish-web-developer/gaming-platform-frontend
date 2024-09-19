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

// context
import { UttranceContext } from "context";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { validationErrorList } from "@/store/slice/login.slice";

const ValidationTooltip: FC<{
  error: string | undefined;
}> = ({ error }) => {
  const theme = useTheme() as ITheme;
  const uttrance_context = useContext(UttranceContext);
  const gsap_context_ref = useRef<gsap.Context>();
  const container_ref = useRef<HTMLDivElement>(null);
  const auth_failed_error = useAppSelector(validationErrorList).filter(
    (error) => error.type == "auth_failed"
  )[0]?.error;

  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
      self.add("showValidationTooltip", () => {
        return new Promise((resolve) => {
          gsap
            .timeline({
              onComplete: resolve,
            })
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
      });
      self.add("closeValidationTooltip", () => {
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
    }, container_ref);
    return () => {
      gsap_context_ref.current?.revert();
      speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    (async function () {
      if (uttrance_context.current && gsap_context_ref.current && error) {
        uttrance_context.current.text = error;
        const uttrance = uttrance_context.current.uttrance;
        await gsap_context_ref.current.showValidationTooltip();
        speechSynthesis.speak(uttrance);
      } else {
        speechSynthesis.cancel();
        await gsap_context_ref.current?.closeValidationTooltip();
      }
    })();
  }, [error]);

  useEffect(() => {
    console.log(
      "value of auth failed error testing",
      auth_failed_error,
      gsap_context_ref,
      uttrance_context
    );
    (async function () {
      if (
        uttrance_context.current &&
        gsap_context_ref.current &&
        auth_failed_error
      ) {
        console.log("value of auth failed error testing", auth_failed_error);
        uttrance_context.current.text = auth_failed_error;
        const uttrance = uttrance_context.current.uttrance;
        await gsap_context_ref.current.showValidationTooltip();
        speechSynthesis.speak(uttrance);
      } else {
        speechSynthesis.cancel();
        await gsap_context_ref.current?.closeValidationTooltip();
      }
    })();
  }, [auth_failed_error]);
  return (
    <>
      {(error || auth_failed_error) && (
        <UttranceProvider handleEnd={() => {}} />
      )}
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
            {error || auth_failed_error}
          </StyledInfoTooltipText>
        </StyledInfoTooltip>
      </div>
    </>
  );
};
export default ValidationTooltip;
