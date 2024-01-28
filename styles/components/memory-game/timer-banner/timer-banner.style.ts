import Image from "next/image";
import styled from "styled-components";


const StyledContainer = styled.div`
  width: 600px;
  height: 153px;
  background:url("/memory-game/timer-banner/timer-background-image.jpg") ;
  background-size:cover;
  background-repeat:no-repeat;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  margin-top: 70px;
  position: relative;
  z-index: 3;
`;


const StyledPatternContainer = styled.div`
  position:absolute;
  top:0px;
  left:0px;
`

const StyledImageContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: -30px;
  width: 253px;
  height: 203px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: contain;
`;

const StyledContentContainer = styled.div`
  width: 380px;
  height: 100%;
  border-radius: 25px;
  float: right;
  padding: 10px;
`;
const StyledContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled.div`
  color: ${({theme})=>theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const StyledSpan = styled.span<{
  $color:string;
}>`
  color:${(props)=>props.$color};
`

const StyledVersusContainer = styled.div`
  height: 38px;
  background-color: ${({ theme }) =>
    theme.palette.primary.dark};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const StyledVersusImage = styled(Image)`
  flex-shrink: 0;
`;

const StyledVersusText = styled.span`
  color: ${({ theme }) => theme.palette.primary.light};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`;


export {
  StyledContainer,
  StyledPatternContainer,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledContentTop,
  StyledLogo,
  StyledSpan,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
};
