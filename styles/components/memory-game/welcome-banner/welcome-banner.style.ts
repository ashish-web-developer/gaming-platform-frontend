import styled from "styled-components";

// mui
import { Avatar, AvatarGroup } from "@mui/material";

type IStyledBadgeContent = {
  $backgroundColor: string;
};

const StyledBanner = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  z-index: 2;
  margin-top: 26px;
  display: flex;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
  }
`;

const StyledBannerCircle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: #f65be3;
  border-radius: 50%;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(200px);
`;

const StyledBannerContent = styled.div`
  background: url("/memory-game/welcome-banner/background.svg");
  width: 321px;
  height: 300.5px;
  background-repeat: no-repeat;
  padding: 18px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    background: url("/memory-game/welcome-banner/mobile/background.svg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;

const StyledBannerImage = styled.div`
  width: calc(100% - 321px);
  height: 300.5px;
  background-image: url("/memory-game/welcome-banner/banner-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledPopularTag = styled.div`
  width: 80px;
  height: 20px;
  background: ${({ theme }) => theme.palette.secondary.info};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const StyledPopularText = styled.span`
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledMainBannerHeader = styled.h3`
  color: #080f0f;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  margin-top: 8px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

const StyledBannerPara = styled.p`
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
  text-transform: capitalize;
  margin-top: 8px;
  width: 246px;
  line-height: 22px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
  }
`;
const StyledAvatarGroup = styled(AvatarGroup)`
  margin-left: 5px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    position: absolute !important;
    top: 10px;
    right: 10px;
  }
`;

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    border: 3px solid ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledBadgeContent = styled.div<IStyledBadgeContent>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(prop) => prop.$backgroundColor};
`;

export {
  StyledBanner,
  StyledBannerContent,
  StyledBannerCircle,
  StyledPopularTag,
  StyledPopularText,
  StyledMainBannerHeader,
  StyledBannerPara,
  StyledAvatarGroup,
  StyledAvatar,
  StyledBadgeContent,
  StyledBannerImage,
};
