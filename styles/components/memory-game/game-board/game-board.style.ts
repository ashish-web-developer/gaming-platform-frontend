import styled from "styled-components";

const StyledGameBoardContainer = styled.div`
  width: 100%;
  height: 523px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  background: #090302;
  border-radius: 25px 25px 0 0;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    bottom: 0px;
    left: -30px;
    box-shadow: 12px 12px 0 #090302;
  }
`;

const StyledBottomGameBoardContainer = styled.div`
  width: 100%;
  height: calc(523px - 90px);
  background: #090302;
  border-radius: 25px 0 25px 25px;
`;

const StyledScoreBoardContainer = styled.div`
  width: 62%;
  height: 100%;
`;

export {
  StyledGameBoardContainer,
  StyledTopBoardContainer,
  StyledScoreBoardContainer,
  StyledTimeBoardContainer,
  StyledBottomGameBoardContainer,
};
