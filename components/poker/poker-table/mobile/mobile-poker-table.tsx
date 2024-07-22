// types
import type { FC } from "react";

// local components
import MobilePokerTableVector from "@/components/poker/poker-table/mobile/mobile-poker-table-vector";

// styled components
import {
  StyledPokerMobileTableWrapper,
  StyledPokerTableWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledChipsInPotWrapper,
  StyledPokerChipsImage,
  StyledLeftPlayerWrapper,
  StyledRightPlayerWrapper,
  StyledBottomPlayerWrapper,
} from "@/styles/components/poker/poker-table/mobile/mobile-poker-table.style";

const MobilePokerTable: FC = () => {
  return (
    <StyledPokerMobileTableWrapper>
      <StyledPokerTableWrapper>
        <StyledLeftPlayerWrapper></StyledLeftPlayerWrapper>
        <StyledRightPlayerWrapper></StyledRightPlayerWrapper>
        <StyledBottomPlayerWrapper></StyledBottomPlayerWrapper>
        <StyledTableDealerProfile>
          <StyledTableDealerProfileImage
            alt="dealer"
            src={"/poker/poker-table/dealer.png"}
            fill={true}
          />
        </StyledTableDealerProfile>
        <StyledChipsInPotWrapper>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            alt="chip"
            width={15}
            height={15}
          />
          800k
        </StyledChipsInPotWrapper>
        <MobilePokerTableVector />
      </StyledPokerTableWrapper>
    </StyledPokerMobileTableWrapper>
  );
};
export default MobilePokerTable;
