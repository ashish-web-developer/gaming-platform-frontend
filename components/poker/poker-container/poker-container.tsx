// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTable from "@/components/poker/poker-table/poker-table";

const PokerContainer: FC = () => {
  return (
    <StyledPage>
      <StyledContainer>
        <PokerHeader />
        <PokerTable />
      </StyledContainer>
    </StyledPage>
  );
};
export default PokerContainer;
