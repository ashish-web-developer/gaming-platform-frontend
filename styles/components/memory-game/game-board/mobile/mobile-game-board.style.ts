import styled from "styled-components";

// mui
import { AvatarGroup, Avatar } from "@mui/material";

type IStyledBadgeContent = {
  $backgroundColor: string;
};

const StyledGameBoardContainer = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const StyledGameBoardBackground = styled.div`
  margin-top: -50px;
  width: 100%;
  position: relative;
`;

const StyledGameBoardContent = styled.div`
  width: 100%;
  aspect-ratio: 1/1.56;
  position: absolute;
  bottom: 0px;
  padding: 40px 0px 85px 0px;
`;

const StyledCardContainer = styled.div`
  padding: 0px 30px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow: auto;
`;

const StyledBottomContainer = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1/0.2;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const StyledTurnIndicator = styled.div`
  width: 45%;
  aspect-ratio: 1/0.3;
  border: 2px solid #fff;
  border-radius: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTrofyCircle = styled.div`
  width: 28%;
  height: 90%;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  background-image: url("/memory-game/game-board/mobile/banner-image.png");
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
`;

const StyledText = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 18px;
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  margin-left: 5px;
  justify-content: flex-end;
`;

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    border: 3px solid #fff;
  }
`;

const StyledBadgeContent = styled.div<IStyledBadgeContent>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(prop) => prop.$backgroundColor};
`;

const StyledTimer = styled.div`
  width: 22%;
  aspect-ratio: 1/1;
  border: 5px dashed #fff;
  border-radius: 50%;
  position: absolute;
  top: -1%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
`;

export {
  StyledGameBoardContainer,
  StyledGameBoardBackground,
  StyledGameBoardContent,
  StyledCardContainer,
  StyledBottomContainer,
  StyledTurnIndicator,
  StyledTrofyCircle,
  StyledText,
  StyledAvatarGroup,
  StyledAvatar,
  StyledBadgeContent,
  StyledTimer,
};
