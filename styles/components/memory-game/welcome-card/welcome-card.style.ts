import styled from "styled-components";
import Image from "next/image";

// icons
import Fire from "@/components/memory-game/welcome-card/icons/fire";

// framer motion
import {motion} from "framer-motion";

const StyledWelcomeCard = styled(motion.div)`
  width: 600px;
  height: 350px;
  border-radius: 10px;
  background: linear-gradient(
    109deg,
    rgba(214, 40, 57, 1) 2.43%,
    rgba(12, 9, 13, 1) 100%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  z-index: 2;
  padding: 18px 26px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/memory-game/welcome-card/background.jpg");
    background-size: 100% 100%;
    opacity: 0.2;
    border-radius: 10px;
    z-index: 0;
  }
`;

const StyledDiamond = styled.span`
  position: absolute;
  top: -40px;
  left: 20px;
`;
const StyledWelcomeCardItem = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

const StyledTag = styled.span`
  display: inline-block;
  position: relative;
  height: 30px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  width: 116px;
`;
const StyledTagText = styled.p`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  color: #000;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
`;

const StyledWelcomeCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledWelcomeCardHeading = styled.h1`
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${({ theme }) => theme.palette.fontFamily.bungee};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  margin-top: 18px;
`;

const StyledWelcomeCardPara = styled.p`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-top: 8px;
`;

const StyledWelcomeInfo = styled.div`
  position: absolute;
  bottom: 48px;
  height: 50px;
  width: 270px;
  left: -20px;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    width: 260px;
    left: 10px;
    height: 100%;
    transform: skewX(20deg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: url("/memory-game/welcome-card/info/background.jpg");
    opacity: 0.3;
    z-index: -2;
  }
  &::after {
    content: "";
    position: absolute;
    width: 260px;
    left: 10px;
    height: 100%;
    transform: skewX(20deg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: url("/memory-game/welcome-card/info/background.jpg");
    background: linear-gradient(
      92deg,
      rgba(243, 222, 44, 0.42) 0.39%,
      rgba(251, 176, 45, 0) 95.95%
    );
    opacity: 0.6;
    z-index: -1;
  }
`;

const StyledInfoGirl = styled(Image)`
  position: absolute;
  bottom: 0px;
  left: 15px;
`;

const StyledInfoText = styled.span`
  color: #fff;
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 70px;
`;


const StyledCardContainer = styled.div`
  display:flex;
  width:100%;
  height:100%;
  justify-content:flex-end;
  align-items:center;
`

const StyledCardBackgroundCard = styled.div`
  width:190px;
  height:285px;
  transform: rotate(-7deg);
  border-radius: 10px;
  background: linear-gradient(156deg, #FFFE71 0%, rgba(255, 216, 0, 0.30) 98.92%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position:relative;
  &::after{
    position:absolute;
    content:"";
    width:100%;
    height:100%;
    background:url('/memory-game/welcome-card/card/card-of-deck.png');
    background-size:cover;
    transform: rotate(7deg);
  }
`

const StyledCardImageContainer = styled.div`
  position:absolute;
  right:10px;
`

export {
  StyledWelcomeCard,
  StyledDiamond,
  StyledTag,
  StyledWelcomeCardItem,
  StyledTagText,
  StyledWelcomeCardContent,
  StyledWelcomeCardHeading,
  StyledWelcomeCardPara,
  StyledWelcomeInfo,
  StyledInfoGirl,
  StyledInfoText,
  StyledCardContainer,
  StyledCardBackgroundCard,
  StyledCardImageContainer
};
