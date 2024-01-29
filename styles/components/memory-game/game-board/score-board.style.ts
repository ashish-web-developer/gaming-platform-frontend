import Image from "next/image";
import styled from "styled-components";

// framer motion
import { motion } from "framer-motion";

const StyledScoreBoard = styled(motion.div)`
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

const StyledAvatar = styled.div<{
  $size: string;
  $online: boolean;
}>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border: 3px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: 50%;
  position: relative;
  &:not(:first-child) {
    margin-left: -10px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) =>
      props.$online
        ? props.theme.palette.success.main
        : props.theme.palette.warning.main};
    border: 2px solid ${({ theme }) => theme.palette.primary.dark};
    top: -5px;
    right: 3px;
  }
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
  gap: 4px;
  align-items: center;
`;
const StyledBannerImage = styled(Image)``;

const StyledScore = styled(motion.div)`
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export {
  StyledScoreBoard,
  StyledContentContainer,
  StyledProfileContainer,
  StyledAvatar,
  StyledUserName,
  StyledScoreContainer,
  StyledBannerImage,
  StyledScore,
};
