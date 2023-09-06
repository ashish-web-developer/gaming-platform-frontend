// types
import type { FC } from "react";
// styled components
import {
  StyledWelcomeCard,
  StyledDiamond,
  StyledWelcomeCardItem,
  StyledTag,
  StyledTagText,
  StyledWelcomeCardContent,
  StyledWelcomeCardHeading,
  StyledWelcomeCardPara,
  StyledWelcomeInfo,
  StyledInfoGirl,
  StyledInfoText,
  StyledCardContainer,
  StyledCardBackgroundCard,
  StyledCardImageContainer
} from "@/styles/components/memory-game/welcome-card/welcome-card.style";

// icons
import Diamond from "@/components/memory-game/welcome-card/icons/diamond";
import Fire from "@/components/memory-game/welcome-card/icons/fire";

// local components
import CardImage from "./card-image";


const WelcomeCard = () => {
  return (
    <StyledWelcomeCard
    whileHover = {{
      scale:1.2
    }}
    >
      <StyledDiamond>
        <Diamond />
      </StyledDiamond>
      <StyledWelcomeInfo>
        <StyledInfoGirl
          width={50}
          height={80}
          src="/memory-game/welcome-card/info/girl.png"
          alt="girl"
        />
        <StyledInfoText>How Far Will Go?</StyledInfoText>
      </StyledWelcomeInfo>
      <StyledWelcomeCardItem>
        <StyledTag>
          <Fire />
          <StyledTagText>Popular</StyledTagText>
        </StyledTag>
        <StyledWelcomeCardContent>
          <StyledWelcomeCardHeading>CogniMatch</StyledWelcomeCardHeading>
          <StyledWelcomeCardPara>
            "Welcome to CogniMatch, <br/>
            darling! 
            <br/>
            Get ready to play and let those
            cards kindle your memory. Let's see how sharp your skills are
            tonight. Enjoy the game and let's make it unforgettable." 💋🃏🌙
          </StyledWelcomeCardPara>
        </StyledWelcomeCardContent>
      </StyledWelcomeCardItem>
      <StyledWelcomeCardItem>
        <StyledCardContainer>
          <StyledCardBackgroundCard>
          </StyledCardBackgroundCard>
          <StyledCardImageContainer>
            <CardImage/>
          </StyledCardImageContainer>
        </StyledCardContainer>
      </StyledWelcomeCardItem>
    </StyledWelcomeCard>
  );
};

export default WelcomeCard;
