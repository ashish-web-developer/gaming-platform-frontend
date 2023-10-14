import Image from "next/image";
import styled from "styled-components";

type IStyledBadgeContent = {
  $backgroundColor: string;
};

const StyledScoreBoard = styled.div`
  width: 97.5%;
  height: 90%;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
    border-radius: 25px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("/memory-game/game-board/score-board-background.jpg");
    background-size: cover;
    opacity: 0.2;
    border-radius: 25px;
  }
`;

const StyledContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const StyeldUserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #000;
`;

const StyledUserName = styled.span`
  color: #fff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledScoreContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const StyledBannerImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -50%);
`;

const StyledScore = styled.div`
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledBadgeContent = styled.div<IStyledBadgeContent>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(prop) => prop.$backgroundColor};
`;
export {
  StyledScoreBoard,
  StyledContentContainer,
  StyledProfileContainer,
  StyeldUserProfile,
  StyledUserName,
  StyledScoreContainer,
  StyledBannerImage,
  StyledScore,
  StyledBadgeContent,
};
