import { AvatarGroup, Avatar } from "@mui/material";
import styled from "styled-components";
import { motion } from "framer-motion";

type IStyledMainText = {
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $rotate?: string;
};

type IStyledMainSpan = {
  $color: string;
};

type IStyledBadgeContent = {
  $backgroundColor: string;
};

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDottedContainer = styled.div`
  width: 98%;
  height: 240px;
  border: ${({ theme }) =>
    theme.palette.welcome_banner.mobile.dotted_container.border};
  border-radius: 25px;
  margin-top: 1.5rem;
`;

const StyledWelcomeBannerContainer = styled(motion.div)`
  width: 100%;
  height: 240px;
  border: ${({ theme }) =>
    theme.palette.welcome_banner.mobile.container.border};
  border-radius: 25px;
  position: relative;
  background: ${({ theme }) =>
    theme.palette.welcome_banner.mobile.container.background};
  display: flex;
  justify-content: center;
  &::after {
    content: "";
    display: inline;
    position: absolute;
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.7);
    border: ${({ theme }) =>
      theme.palette.welcome_banner.mobile.container.trophy_container.border};
    border-radius: 50%;
    transform: translate(0%, -50%);
    background-image: url("/memory-game/welcome-banner/mobile/banner-image.png");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    left: 20px;
  }
`;

const StyledMainText = styled.span<IStyledMainText>`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-weight: 800;
  position: absolute;
  transform: rotate(${(props) => props.$rotate ?? "0deg"});
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
`;

const StyledMainSpan = styled.span<IStyledMainSpan>`
  color: ${(props) => props.$color};
`;

const StyledStarContainer = styled.span`
  display: flex;
  position: absolute;
  bottom: 16px;
  left: 50px;
`;

const StyledContent = styled.p`
  margin-top: 30px;
  color: ${({ theme }) =>
    theme.palette.welcome_banner.mobile.container.content_text_color};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 15px;
  text-transform: capitalize;
  width: 75%;
  font-weight: 600;
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const StyledAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
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
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainText,
  StyledMainSpan,
  StyledStarContainer,
  StyledContent,
  StyledAvatarGroup,
  StyledAvatar,
  StyledBadgeContent,
};
