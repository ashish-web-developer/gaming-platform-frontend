// types
import type { FC, ReactNode } from "react";

// styled components
import {
  StyledPlayerCardContainer,
  StyledPlayerCardTop,
  StyledPlayerCardBottom,
  StyledChildContainer
} from "@/styles/components/memory-game/player-card/player-card.style";

const PlayerCard: FC<{
  width: number;
  left: number;
  bottom: number;
  zIndex: number;
  topBackground: string;
  bottomBackground: string;
  children:ReactNode
}> = ({ width, left, bottom, zIndex ,topBackground,bottomBackground,children}) => {
  return (
    <StyledPlayerCardContainer
      $width={width}
      $left={left}
      $bottom={bottom}
      $zIndex={zIndex}
    >
      <StyledPlayerCardTop $width={width} $topBackground = {topBackground} />
      <StyledPlayerCardBottom $width={width} $bottomBackground = {bottomBackground}/>
      <StyledChildContainer>
        {children}
      </StyledChildContainer>
    </StyledPlayerCardContainer>
  );
};

export default PlayerCard;
