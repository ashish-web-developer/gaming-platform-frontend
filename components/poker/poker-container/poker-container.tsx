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
import PokerSlider from "@/components/poker/poker-slider/poker-slider";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_poker_slider } from "@/store/slice/poker/poker.slice";

const PokerContainer: FC = () => {
  const _show_poker_slider = useAppSelector(show_poker_slider);
  return (
    <StyledPage>
      <StyledContainer>
        <PokerHeader />
        <PokerTable />
        {_show_poker_slider && <PokerSlider />}
      </StyledContainer>
    </StyledPage>
  );
};
export default PokerContainer;
