import styled from "styled-components";
import Image from "next/image";

type IStyledCircularLetter = {
  $rotate: number;
};
type IStyledLogoSpan = {
  $color: string;
};

const StyledResultBoardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 524px;
  border-radius: 25px;
  border: 10px solid ${({ theme }) => theme.palette.result_board.border_color};
  background: ${({ theme }) => theme.palette.result_board.background_color};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

const StyledLottieContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 4;
`;
const StyledStartIconContainer = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const StyledBoardText = styled.div`
  color: ${({ theme }) => theme.palette.result_board.background_color};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 30px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  text-transform: capitalize;
  width: 370px;
  padding: 90px 0px 0px 50px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) =>
    theme.palette.result_board.text_color};
`;
const StyledCircularTextContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  left: 50px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.result_board.text_color};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
`;

const StyledCircularText = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const StyledCircularLetter = styled.span<IStyledCircularLetter>`
  position: absolute;
  transform: rotate(${(props) => props.$rotate}deg);
  left: 50%;
  transform-origin: 0px 40px;
  font-size: 10px;
`;

const StyledPointsText = styled.p`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 900;
`;
const StyledLogoContainer = styled.div`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 40px;
  font-weight: 900;
  transform: rotate(-10deg);
  position: absolute;
  right: 50px;
  bottom: 100px;
`;
const StyledLogoSpan = styled.span<IStyledLogoSpan>`
  color: ${(props) => props.$color};
`;
const StyledCrownImageContainer = styled.div`
  position: absolute;
  top: -92px;
  left: -20px;
  transform: rotate(10deg);
  width: 291px;
  height: 111px;
`;

const StyledCrownImage = styled(Image)`
  object-fit: cover;
`;

export {
  StyledResultBoardContainer,
  StyledStartIconContainer,
  StyledBoardText,
  StyledCircularTextContainer,
  StyledCircularText,
  StyledCircularLetter,
  StyledPointsText,
  StyledLogoContainer,
  StyledLogoSpan,
  StyledCrownImageContainer,
  StyledCrownImage,
  StyledLottieContainer,
};
