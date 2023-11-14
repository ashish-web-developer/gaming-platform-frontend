import Image from "next/image";
import styled from "styled-components";

type IStyledLogoSpan = {
  $color: string;
};

type IStyledScoreContainer = {
  $backgroundColor: string;
};

type IStyledScore = {
  $backgroundColor: string;
};

const StyledScoreBoardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 10px solid
    ${({ theme }) => theme.palette.result_board.score_board.border_color};
  background: ${({ theme }) =>
    theme.palette.result_board.score_board.background_color};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledTrofyBannerContainer = styled.div`
  width: 90%;
  height: 292px;
  border: 6px dashed #fff;
  margin-top: 1.3rem;
  border-radius: 25px;
  background: url("/memory-game/result-board/score-board/score-board-background.png");
  background-repeat: no-repeat;
  position: relative;
  &::after {
    content: "W";
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
    font-size: 180px;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    top: 0px;
    left: 0px;
  }
`;

const StyledScoreBoardContent = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBannerImage = styled(Image)`
  object-fit: contain;
  top: 0px;
  left: 0px;
`;

const StyledLogo = styled.p`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-weight: 700;
`;
const StyledLogoSpan = styled.span<IStyledLogoSpan>`
  color: ${(props) => props.$color};
`;

const StyledWinnerName = styled.div`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

const StyledScoreContainer = styled.div<IStyledScoreContainer>`
  width: 90%;
  height: 60px;
  border-radius: 16px;
  background-color: ${(props) => props.$backgroundColor};
  display: grid;
  grid-template-columns: 70px 1fr;
`;

const StyledRank = styled.span`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNameAndScoreContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 6px;
`;
const StyledNameAndScore = styled.div`
  height: 80%;
  width: 100%;
  border-radius: 16px;
  border: 3px solid #fff;
  background: #191308;
  display: flex;
  align-items: center;
  padding-left: 1.2rem;
  gap: 1rem;
`;

const StyledScore = styled.div<IStyledScore>`
  width: 30px;
  height: 30px;
  background: ${(props) => props.$backgroundColor};
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledCrownIconContainer = styled.span`
  position: absolute;
  top: -20px;
`;

const StyledUserName = styled.div`
  color: #fff;
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

export {
  StyledScoreBoardContainer,
  StyledTrofyBannerContainer,
  StyledScoreBoardContent,
  StyledBannerImage,
  StyledLogo,
  StyledLogoSpan,
  StyledWinnerName,
  StyledScoreContainer,
  StyledRank,
  StyledNameAndScoreContainer,
  StyledNameAndScore,
  StyledScore,
  StyledCrownIconContainer,
  StyledUserName,
};
