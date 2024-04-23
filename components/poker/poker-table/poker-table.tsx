// types
import { type FC } from "react";

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

// hooks
import { usePokerTableHeight } from "@/hooks/poker/poker.hook";

const PokerTable: FC = () => {
  const height = usePokerTableHeight();

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
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
