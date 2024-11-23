import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { IUser } from "@/types/store/slice/login";

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
  showBuyInModal,
  dealerId,
  activePokerPlayers,
  dealHandApi,
} from "@/store/slice/poker/poker.slice";
import { User } from "@/store/slice/login.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const PokerContainer: FC = () => {
  const dispatch = useAppDispatch();
  const container_ref = useRef<HTMLDivElement>(null);
  const is_mobile = useIsMobile();
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const { id: user_id } = useAppSelector(User) as IUser;
  const dealer_id = useAppSelector(dealerId);
  const no_of_players_playing = useAppSelector(activePokerPlayers).length;
  const timeout_ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (no_of_players_playing == 7 && user_id == dealer_id) {
      timeout_ref.current = setTimeout(() => {
        dispatch(dealHandApi());
      }, 2000);
    }
    return () => {
      timeout_ref.current && clearTimeout(timeout_ref.current);
    };
  }, [no_of_players_playing, user_id, dealer_id]);
  return (
    <StyledPage>
      {is_mobile ? (
        <>
          {show_buy_in_modal ? (
            <>
              <PokerBuyInDrawer />
              <StyledMobileLogoWrapper>
                <StyledMobileLogo>
                  Texas Hold'em <br /> Showdown
                </StyledMobileLogo>
              </StyledMobileLogoWrapper>
              <StyledGirlImageWrapper>
                <StyledGirlImage
                  alt="girl-image"
                  fill={true}
                  src={"/poker/girl.png"}
                />
              </StyledGirlImageWrapper>
            </>
          ) : (
            <MobilePokerTable />
          )}
        </>
      ) : (
        <StyledContainer ref={container_ref}>
          <PokerHeader />
          <PokerTable />
          {show_buy_in_modal && <PokerBuyInDialog />}
        </StyledContainer>
      )}
    </StyledPage>
  );
};
export default PokerContainer;
