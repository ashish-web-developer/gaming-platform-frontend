import { useEffect } from "react";
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
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_buy_in_modal,
  dealer_id,
  active_poker_players,
  dealHandApi,
} from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";

const PokerContainer: FC = () => {
  const dispatch = useAppDispatch();
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
  const { id: user_id } = useAppSelector(user);
  const _dealer_id = useAppSelector(dealer_id);
  const no_of_players_playing = useAppSelector(active_poker_players).length;

  useEffect(() => {
    if (no_of_players_playing == 3 && user_id == _dealer_id) {
      dispatch(dealHandApi());
    }
  }, [no_of_players_playing, user_id, _dealer_id]);
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
