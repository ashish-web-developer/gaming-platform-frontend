import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContainer,
  StyledMobileLogoWrapper,
  StyledMobileLogo,
  StyledGirlImageWrapper,
  StyledGirlImage,
} from "@/styles/components/poker/poker-container/poker-container.style";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTable from "@/components/poker/poker-table/poker-table";
const MobilePokerTable = dynamic(
  () => import("@/components/poker/poker-table/mobile/mobile-poker-table"),
  {
    ssr: false,
  }
);
const PokerBuyInDialog = dynamic(
  () => import("@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog"),
  {
    ssr: false,
  }
);
const PokerBuyInDrawer = dynamic(
  () =>
    import("@/components/poker/poker-buy-in-dialog/mobile/poker-buy-in-drawer"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_buy_in_modal,
  dealer_id,
  active_poker_players,
  dealHandApi,
} from "@/store/slice/poker/poker.slice";
import { user } from "@/store/slice/user.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const PokerContainer: FC = () => {
  const dispatch = useAppDispatch();
  const is_mobile = useIsMobile();
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
  const { id: user_id } = useAppSelector(user);
  const _dealer_id = useAppSelector(dealer_id);
  const no_of_players_playing = useAppSelector(active_poker_players).length;
  const timeout_ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (no_of_players_playing == 7 && user_id == _dealer_id) {
      timeout_ref.current = setTimeout(() => {
        dispatch(dealHandApi());
      }, 2000);
    }
    return () => {
      timeout_ref.current && clearTimeout(timeout_ref.current);
    };
  }, [no_of_players_playing, user_id, _dealer_id]);
  return (
    <StyledPage>
      {is_mobile ? (
        <>
          {_show_buy_in_modal ? (
            <>
              <PokerBuyInDrawer />
              <StyledMobileLogoWrapper>
                <StyledMobileLogo>
                  Texas Hold'em <br /> Showdown
                </StyledMobileLogo>
                <StyledGirlImageWrapper>
                  <StyledGirlImage
                    alt="girl-image"
                    fill={true}
                    src={"/poker/girl.png"}
                  />
                </StyledGirlImageWrapper>
              </StyledMobileLogoWrapper>
            </>
          ) : (
            <MobilePokerTable />
          )}
        </>
      ) : (
        <StyledContainer>
          <PokerHeader />
          <PokerTable />
          {_show_buy_in_modal && <PokerBuyInDialog />}
        </StyledContainer>
      )}
    </StyledPage>
  );
};
export default PokerContainer;
