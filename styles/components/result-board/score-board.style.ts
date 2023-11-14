import Image from "next/image";
import styled from "styled-components";

type IStyledLogoSpan = {
  $color: string;
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
  justify-content: center;
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

export {
  StyledScoreBoardContainer,
  StyledTrofyBannerContainer,
  StyledScoreBoardContent,
  StyledBannerImage,
  StyledLogo,
  StyledLogoSpan,
  StyledWinnerName,
};
