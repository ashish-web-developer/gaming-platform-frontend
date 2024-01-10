import styled from "styled-components";

type IStyledAvatar = {
  $size: string;
  $border: string;
  $online: boolean;
};

const StyledBanner = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  background: ${({ theme }) => theme.palette.welcome_banner.main};
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
  background: ${({ theme }) =>
    theme.palette.welcome_banner.side_container.background};
  width: 321px;
  height: 300.5px;
  background-repeat: no-repeat;
  padding: 18px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    background: ${({ theme }) =>
      theme.palette.welcome_banner.side_container.mobile.background};
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
  background: ${({ theme }) => theme.palette.welcome_banner.tag.main};
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
  color: ${({ theme }) => theme.palette.welcome_banner.main};
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
  color: ${({ theme }) => theme.palette.welcome_banner.side_container.text};
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

const StyledAvatarGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledAvatar = styled.div<IStyledAvatar>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border: ${(props) => props.$border};
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
    background: ${(props) => (props.$online ? "#16C172" : "#F42C04")};
    top: -5px;
    right: 3px;
  }
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
  StyledBannerImage,
};
