// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";

const PokerContainer: FC = () => {
  return (
    <StyledPage>
      <StyledContainer>
        <PokerHeader />
      </StyledContainer>
    </StyledPage>
  );
};
export default PokerContainer;
