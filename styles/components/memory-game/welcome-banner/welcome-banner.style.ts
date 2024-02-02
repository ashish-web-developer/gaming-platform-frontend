import styled from "styled-components";
import Image from "next/image";

const StyledBanner = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  background: ${({ theme }) => theme.palette.primary.dark};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  z-index: 2;
  margin-top: 26px;
  display: flex;
  justify-content: flex-end;
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

const StyledWelcomeBannerPatternContainer = styled.div`
  width: 321px;
  height: 300.5px;
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 0;
`;
const StyledWelcomeBannerContent = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-left: 24px;
  gap: 6px;
`;

const StyledStarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const StyledBannerImage = styled.div`
  width: calc(100% - 321px);
  height: 300.5px;
  background-image: url("/memory-game/welcome-banner/banner-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledMainBannerHeader = styled.h3`
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  line-height: 1;
`;

const StyledSpan = styled.span<{
  $color: string;
}>`
  color: ${(props) => props.$color};
`;

const StyledBannerPara = styled.p`
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
  text-transform: capitalize;
  width: 246px;
  line-height: 22px;
`;

const StyledAvatarGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledAvatar = styled.div<{
  $size: string;
  $border: string;
  $online: boolean;
}>`
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
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => (props.$online ? "#16C172" : "#F42C04")};
    border: 2px solid ${(props) => props.theme.palette.primary.dark};
    top: -5px;
    right: 3px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

export {
  StyledBanner,
  StyledWelcomeBannerPatternContainer,
  StyledWelcomeBannerContent,
  StyledStarIconWrapper,
  StyledBannerCircle,
  StyledMainBannerHeader,
  StyledSpan,
  StyledBannerPara,
  StyledAvatarGroup,
  StyledAvatar,
  StyledImage,
  StyledBannerImage,
};
