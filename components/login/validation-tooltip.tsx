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

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { validatorError, updateShowTooltip } from "@/store/slice/login.slice";

// gsap
import gsap from "gsap";

// context
import { UttranceContext } from "context";

// hooks
import { useInitializeUttrance } from "@/hooks/login/login.hook";

const ValidationTooltip: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const validation_error = useAppSelector(validatorError);
  const uttrance_context = useContext(UttranceContext);
  const gsap_context_ref = useRef<gsap.Context>();
  const validator_error = useAppSelector(validatorError);
  const container_ref = useRef<HTMLDivElement>(null);

  useInitializeUttrance({
    handleEnd: () => {
      console.log("testing");
    },
  });

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
      if (
        uttrance_context.current &&
        gsap_context_ref.current &&
        validation_error
      ) {
        await gsap_context_ref.current.showValidationTooltip();
        uttrance_context.current.text = validation_error as string;
        speechSynthesis.speak(uttrance_context.current.uttrance);
      } else {
        await gsap_context_ref.current?.closeValidationTooltip();
        dispatch(
          updateShowTooltip({
            type: "validation",
            show: false,
          })
        );
      }
    })();
  }, [validation_error]);
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
