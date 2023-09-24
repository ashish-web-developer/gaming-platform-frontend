import Image from "next/image";
import styled from "styled-components";

// mui
import { IconButton } from "@mui/material";

const StyledContainer = styled.div`
  width: 600px;
  height: 153px;
  background: ${({ theme }) => theme.palette.secondary.info};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  margin-top: 80px;
  position: relative;
  z-index: 3;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    height: 109px;
  }
`;

const StyledBannerBackgroundOne = styled.div`
  width: 229px;
  height: 100%;
  background: url("/memory-game/start-banner/background-one.svg");
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 137px;
    background: url("/memory-game/start-banner/mobile/background-one.svg");
  }
`;

const StyledBannerBackgroundTwo = styled.div`
  width: 207px;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.start_banner_background};
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 128px;
    height: 100%;
    background: ${({ theme }) =>
      theme.palette.primary.mobile_start_banner_background};
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;

const StyledImageContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 120px;
  height: 241px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  bottom: 0px;
  left: 0px;
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
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    justify-content: flex-end;
  }
`;

const StyledLogo = styled.div`
  color: #f9f8f8;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledVersusContainer = styled.div`
  height: 38px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    height: 23px;
  }
`;

const StyledVersusImage = styled(Image)`
  flex-shrink: 0;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 25px;
    height: 25px;
  }
`;

const StyledVersusText = styled.span`
  color: ${({ theme }) => theme.palette.primary.info};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const StyledPlayButton = styled(IconButton)`
  position: absolute !important;
  bottom: 0px;
  right: 0px;
`;

export {
  StyledContainer,
  StyledBannerBackgroundOne,
  StyledBannerBackgroundTwo,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledContentTop,
  StyledLogo,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledPlayButton,
};
