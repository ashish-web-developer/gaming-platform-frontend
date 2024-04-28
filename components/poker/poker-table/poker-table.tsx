// types
import { type FC } from "react";

// styled components
import {
  StyledPokerTableWrapper,
  StyledPokerVectorWrapper,
  StyledTableDealerProfile,
  StyledTableDealerProfileImage,
  StyledTableCardWrapper,
} from "@/styles/components/poker/poker-table/poker-table.style";

// local components
import PokerTableVector from "@/components/poker/poker-table/poker-table-vector";
import PokerPlayer from "@/components/poker/poker-player/poker-player";
import PokerCard from "@/components/poker/poker-card/poker-card";

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
        <PokerPlayer align="left" is_dealer={true} />
        <PokerPlayer align="right" />
        <PokerPlayer align="down" show_action_cta={true} />
        <PokerTableVector width={900} height={height} />
      </StyledPokerVectorWrapper>
      <StyledTableCardWrapper>
        {new Array(5).fill(0).map(() => {
          return <PokerCard suit={"club"} rank={"4"} />;
        })}
      </StyledTableCardWrapper>
    </StyledPokerTableWrapper>
  );
};

export default PokerTable;
