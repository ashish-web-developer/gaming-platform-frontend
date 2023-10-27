import styled from "styled-components";
// mui
import { Skeleton } from "@mui/material";

const StyledGameBoardContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  z-index: 3;
`;

const StyledTopBoardContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
`;

const StyledTimeBoardContainer = styled.div`
  width: 38%;
  height: 100%;
  background: ${({ theme }) => theme.palette.game_board.background};
  border-radius: 25px 25px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    position: absolute;
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    bottom: 0px;
    left: -30px;
    box-shadow: 12px 12px 0
      ${({ theme }) => theme.palette.game_board.background};
  }
`;

const StyledBottomGameBoardContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.palette.game_board.background};
  border-radius: 25px 0 25px 25px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
`;

const StyledScoreBoardContainer = styled.div`
  width: 62%;
  height: 100%;
`;

const StyledSkeleton = styled(Skeleton)`
  background: #392030;
`;

export {
  StyledGameBoardContainer,
  StyledTopBoardContainer,
  StyledScoreBoardContainer,
  StyledTimeBoardContainer,
  StyledBottomGameBoardContainer,
  StyledSkeleton,
};
