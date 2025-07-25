import { useEffect, useContext, useState } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/login.theme";

// styled components
import {
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledInfoTooltip,
  StyledInfoTooltipText,
  StyledSpan,
} from "@/styles/components/login/introduction-tooltip.style";

// theme
import { useTheme } from "styled-components";

// vector
import InfoTooltipVector from "./vector/info-tooltip-vector";

// provider
import UttranceProvider from "@/providers/UttranceProvider";

// context
import { UttranceContext } from "context";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { isTyping } from "@/store/slice/login.slice";

const tooltip_text_list = [
  "Hey there! Welcome to Fortune Realm!",
  "Step into the ultimate casino gaming experience where excitement knows no bounds.",
  "Your journey to fortune and fun starts right here, right now!",
];

const TooltipText: FC<{ tooltip_text_index: number }> = ({
  tooltip_text_index,
}) => {
  const theme = useTheme() as ITheme;
  if (tooltip_text_index == 0) {
    return (
      <>
        <StyledSpan $color={theme.palette.error.main}>
          {tooltip_text_list[0].split(" ").splice(0, 2).join(" ")}
        </StyledSpan>{" "}
        {tooltip_text_list[0].split(" ").slice(2).join(" ")}{" "}
      </>
    );
  }
  return <>{tooltip_text_list[tooltip_text_index]}</>;
};

const IntroductionTooltip: FC = () => {
  const is_typing = useAppSelector(isTyping);
  const uttrance_context = useContext(UttranceContext);
  const [tooltip_text_index, set_tooltip_text_index] = useState(0);

  const { contextSafe } = useGSAP(() => {});

  const startTooltipAnimation = contextSafe(() => {
    gsap
      .timeline({
        onComplete: () => {
          if (uttrance_context.current) {
            uttrance_context.current.text =
              tooltip_text_list[tooltip_text_index];
            speechSynthesis.speak(uttrance_context.current?.uttrance);
          }
        },
      })
      .from("#girl-image-wrapper", {
        display: "none",
        delay: 1,
        translateX: -250,
        duration: 1,
        ease: "expo",
      })
      .from("#info-tooltip", {
        display: "none",
        scale: 1.5,
        duration: 1,
        ease: "elastic.inOut",
      });
  });

  const tooltipAnimation = contextSafe((current_tooltip_index: number) => {
    gsap.from("#info-tooltip", {
      opacity: 0,
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        if (uttrance_context.current) {
          uttrance_context.current.text =
            tooltip_text_list[current_tooltip_index];
          speechSynthesis.speak(uttrance_context.current?.uttrance);
        }
      },
    });
  });

  const closeTooltipAnimation = () => {
    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: resolve,
        })
        .to("#info-tooltip", {
          display: "none",
          scale: 0,
          duration: 1,
          ease: "elastic.inOut",
        })
        .to("#girl-image-wrapper", {
          display: "none",
          translateX: -300,
          duration: 1,
          ease: "back",
        });
    });
  };

  useEffect(() => {
    (async function () {
      if (tooltip_text_index == 0 && !is_typing) {
        startTooltipAnimation();
      } else if (
        (tooltip_text_index == 1 || tooltip_text_index == 2) &&
        !is_typing
      ) {
        tooltipAnimation(tooltip_text_index);
      } else {
        await closeTooltipAnimation();
        speechSynthesis.cancel();
      }
    })();
  }, [tooltip_text_index, is_typing]);
  return (
    <>
      {tooltip_text_index < 3 && !is_typing && (
        <UttranceProvider
          handleEnd={() => {
            set_tooltip_text_index((prev) => prev + 1);
          }}
        />
      )}
      <StyledGirlImageWrapper
        id="girl-image-wrapper"
        $width="450px"
        $height="465px"
        $left="0px"
      >
        ;
        <StyledGirlImage
          fill={true}
          alt="girl-image"
          src="/login/login-girl.png"
          sizes="(max-width: 1400px) 25vw"
        />
      </StyledGirlImageWrapper>

      <StyledInfoTooltip $bottom="270px" $left="200px" id="info-tooltip">
        <InfoTooltipVector />
        <StyledInfoTooltipText
          $font_size={tooltip_text_index == 0 ? "1.2rem" : "1rem"}
          $rotate="-8deg"
          $top="35px"
          $left="100px"
          $color="#fff"
        >
          <TooltipText tooltip_text_index={tooltip_text_index} />
        </StyledInfoTooltipText>
      </StyledInfoTooltip>
    </>
  );
};
export default IntroductionTooltip;
