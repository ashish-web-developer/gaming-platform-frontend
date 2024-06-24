import dynamic from "next/dynamic";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

const PokerBuyInDialog = dynamic(
  () => import("@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog"),
  {
    ssr: false,
  }
);

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTable from "@/components/poker/poker-table/poker-table";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_buy_in_modal } from "@/store/slice/poker/poker.slice";

const PokerContainer: FC = () => {
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
  return (
    <StyledPage>
      <StyledContainer>
        <PokerHeader />
        <PokerTable />
        {_show_buy_in_modal && <PokerBuyInDialog />}
      </StyledContainer>
    </StyledPage>
  );
};
export default PokerContainer;
