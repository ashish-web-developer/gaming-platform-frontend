import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

type IStyledMainSpan = {
  $color: string;
};

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDottedContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 98%;
  height: 240px;
  border: 2px dashed
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  border-radius: 25px;
  margin-top: 1.5rem;
`;

const StyledWelcomeBannerContainer = styled(motion.div)`
  width: 100%;
  height: 240px;
  border: 4px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: 25px;
  position: relative;
  background: url("/memory-game/welcome-banner/mobile/background-pattern.png"),
    ${({ theme }) => theme.palette.primary.contrast};
  display: flex;
  justify-content: center;
  &::after {
    content: "";
    display: inline;
    position: absolute;
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid #16c172;
    border-radius: 50%;
    transform: translate(0%, -50%);
    background-image: url("/memory-game/welcome-banner/mobile/banner-image.png");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    left: 20px;
  }
`;

const StyledMainText = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $rotate?: string;
}>`
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: 12px;
  font-weight: 800;
  position: absolute;
  transform: rotate(${(props) => props.$rotate ?? "0deg"});
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
`;

const StyledSpan = styled.span<{
  $color: string;
}>`
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
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 15px;
  text-transform: capitalize;
  width: 75%;
  font-weight: 600;
`;

export {
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainText,
  StyledSpan,
  StyledStarContainer,
  StyledContent,
};
