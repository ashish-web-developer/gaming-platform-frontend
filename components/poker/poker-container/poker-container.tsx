import dynamic from "next/dynamic";
// types
import type { FC } from "react";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTimer from "@/components/poker/poker-timer/poker-timer";

const PokerTable = dynamic(
  () => import("@/components/poker/poker-table/poker-table"),
  {
    ssr: false,
  }
);

// styled components
import {
  StyledPage,
  StyledContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

const PokerContainer: FC = () => {
  return (
    <StyledPage>
      <StyledContainer>
        <PokerHeader />
        <PokerTable />
        <PokerTimer />
      </StyledContainer>
      <div id="poker-buy-in-dialog-container"></div>
    </StyledPage>
  );
};

export default PokerContainer;
