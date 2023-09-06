import Image from "next/image";
// types
import type { FC } from "react";

// local components
import WelcomeCard from "@/components/memory-game/welcome-card/welcome-card";
import Nav from "@/components/memory-game/nav/nav";
import PlayerCard from "@/components/memory-game/player-card/player-card";
import AudioPlayModal from "@/components/memory-game/audio-play-modal/audio-play-modal";
import RulesTooltip from "@/components/memory-game/rules-tooltip/rules-tooltip";

// styled components
import {
  StyledMemoryGameContainer,
  StyledPlayerNameContainer,
  StyledWelcomeText,
} from "@/styles/components/memory-game/memory-game.style";

const MemoryGame: FC = () => {
  return (
    <>
      <StyledMemoryGameContainer>
        <Nav />
        <AudioPlayModal />
        <RulesTooltip />
        <StyledWelcomeText>Good Morning,<br/> Angelina!💋</StyledWelcomeText>
        <PlayerCard
          width={150}
          left={85}
          bottom={85}
          zIndex={2}
          topBackground="linear-gradient(108deg, #FFAD01 0%, rgba(250, 250, 55, 0.79) 93.62%)"
          bottomBackground="linear-gradient(180deg, #FF2400 0%, rgba(226, 6, 44, 0.60) 100%)"
        >
          <Image
            width={100}
            height={200}
            alt="player-girl"
            src="/memory-game/player-card/player-girl.svg"
          />
          <StyledPlayerNameContainer>Vishal</StyledPlayerNameContainer>
        </PlayerCard>
        <PlayerCard
          width={130}
          left={220}
          bottom={100}
          zIndex={1}
          topBackground="linear-gradient(108deg, #FB607F 0%, rgba(255, 84, 112, 0.79) 93.62%)"
          bottomBackground="linear-gradient(180deg, #3F00FF 0%, rgba(25, 25, 112, 0.60) 100%)"
        >
          <Image
            width={100}
            height={200}
            alt="player-girl"
            src="/memory-game/player-card/player-girl.svg"
          />
          <StyledPlayerNameContainer>Ashish</StyledPlayerNameContainer>
        </PlayerCard>
        <WelcomeCard />
      </StyledMemoryGameContainer>
    </>
  );
};

export default MemoryGame;
