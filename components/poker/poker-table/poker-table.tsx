// types
import type { FC } from "react";

// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayer from "@/components/poker/poker-player/poker-player";

const PokerTable: FC = () => {
  return (
    <StyledPokerTableWrapper>
      <StyledTableDealerProfile>
        <StyledTableDealerProfileImage
          alt="dealer"
          src={"/poker/poker-table/dealer.png"}
          fill={true}
        />
      </StyledTableDealerProfile>
      <StyledPokerVectorWrapper>
        <PokerPlayer align="left" />
        <PokerPlayer align="right" />
        <PokerPlayer align="down" />
        <PokerTableVector width={900} height={500} />
      </StyledPokerVectorWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
