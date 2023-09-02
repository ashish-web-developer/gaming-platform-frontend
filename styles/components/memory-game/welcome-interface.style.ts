import styled from "styled-components";

// next
import Image from "next/image";
// framer motion
import {motion} from "framer-motion"

type IStyledImage = {
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?:string;
  $rotate: number;
};

const StyledWelcomeInterface = styled(motion.div)`
  width: 800px;
  height: 400px;
  border-radius: 33px;
  background: url("/memory-game/welcome-interface/background-pattern.png"),
    linear-gradient(225deg, #f49d37 0%, rgba(242, 43, 41, 0.84) 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  gap: 60px;
  align-items: center;
  position: relative;
`;

const StyledWelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  height:100%;
  padding-top:43px;
  position:relative;
  z-index:2;
`;
const StyledWelcomeHeading = styled.h3`
  font-family: ${({ theme }) => theme.palette.fontFamily.primary.monofett};
  color: #140f2d;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const StyledWelcomePara = styled.p`
  color: #140f2d;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`;


const StyledImage = styled(Image)<IStyledImage>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right:${(props)=>props.$right??"auto"};
  transform: rotate(${(props) => props.$rotate}deg);
`


export {
  StyledWelcomeInterface,
  StyledWelcomeContent,
  StyledWelcomeHeading,
  StyledWelcomePara,
  StyledImage,
};
