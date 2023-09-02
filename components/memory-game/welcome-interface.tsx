// next
import Image from "next/image";
// styled components
import {
  StyledWelcomeInterface,
  StyledWelcomeContent,
  StyledWelcomeHeading,
  StyledWelcomePara,
  StyledImage,
} from "@/styles/components/memory-game/welcome-interface.style";

// local components
import Timer from "@/components/memory-game/timer";
import WelcomeCardImage from "@/components/memory-game/welcome-card-image";

// theme
import { useTheme } from "styled-components";
import { anticipate } from "framer-motion";


const WaitingInterface = () => {
  const theme = useTheme();
  return (
    <>
      <StyledWelcomeInterface
        initial = {{
          opacity:0,
          scale:1.4
        }}
        animate = {{
          opacity:1,
          scale:1,
        }}
        transition={{
          duration:1,
          ease:"circInOut"
        }}
        whileHover={{
          zIndex:3,
          scale:1.2
        }}
      >
        <StyledImage
          $top="12px"
          $left="14px"
          $rotate={-27}
          src="/memory-game/welcome-interface/card-1.svg"
          width={60}
          height={92}
          alt="card"
        />
        <StyledImage
          $bottom="12px"
          $left="14px"
          $rotate={27}
          src="/memory-game/welcome-interface/card-2.svg"
          width={60}
          height={92}
          alt="card"
        />
        <StyledImage
          $bottom="-20px"
          $right="14px"
          $rotate={0}
          src="/memory-game/welcome-interface/chips.svg"
          width={186}
          height={152}
          alt="card"
        />
        <Timer />
        <StyledWelcomeContent>
          <StyledWelcomeHeading>MEMORY MARVELS</StyledWelcomeHeading>
          <StyledWelcomePara>
            Flip cards to find matching pairs. Remember positions for better
            matches. Earn points for each match. Play until all pairs are found.
            Test yourself against the clock for an added challenge. Enjoy
            boosting your memory!
          </StyledWelcomePara>
        </StyledWelcomeContent>
        <WelcomeCardImage/>
      </StyledWelcomeInterface>
    </>
  );
};

export default WaitingInterface;
