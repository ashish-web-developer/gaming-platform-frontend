// types
import type { FC } from "react";

// local components
import PokerBuyInDialog from "@/components/poker/poker-buy-in-dialog/poker-buy-in-dialog";

// styled components
import {
  StyledPage,
  StyledContainer,
  StyledTableWrapper,
  StyledImageContainer,
  StyledImage,
} from "@/styles/components/poker/poker-container/poker-container.style";

const PokerContainer: FC = () => {
  return (
    <StyledPage>
      <StyledContainer>
        <StyledImageContainer // Table Wrapper
          $width="970px"
          $height="530px"
          $top="50%"
          $left="50%"
          $translateX="-50%"
          $translateY="-50%"
        >
          <StyledImageContainer
            $width="312px"
            $height="216px"
            $left="50%"
            $translateX="-50%"
            $top="-80px"
            $zIndex={1}
          >
            <StyledImage
              fill={true}
              src="/poker/poker-table/dealer.png"
              alt="dealer"
            />
          </StyledImageContainer>
          <StyledImage
            src="/poker/poker-table/table.png"
            fill={true}
            alt="poker-table"
          />
        </StyledImageContainer>
      </StyledContainer>
      <PokerBuyInDialog />
    </StyledPage>
  );
};

export default PokerContainer;
