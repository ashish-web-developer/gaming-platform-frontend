import Image from "next/image";
import styled from "styled-components";

const StyledInvitationCard = styled.div<{
  $mode: "light" | "dark";
}>`
  width: calc(100% - 30px);
  height: 120px;
  margin-top: 20px;
  border: 3px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.light
        : props.theme.palette.primary.dark};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin-top: 22px;
  &::before {
    content: "";
    width: calc(100% / 1.5);
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: url("/common/invitation-card/background.png"), #f5e960;
  }
  &::after {
    content: "";
    width: calc(100% / 1.5);
    height: 100%;
    position: absolute;
    right: -50px;
    top: 0px;
    transform: skew(-150deg);
    border-width: 0px;
    border-left-width: 3px;
    border: 1.5px solid
      ${(props) =>
        props.$mode == "light"
          ? props.theme.palette.primary.light
          : props.theme.palette.primary.dark};
    border-style: solid;
    background: url("/common/invitation-card/background.png"), #f42c04;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0px;
    flex-basis: 124px;
    width: 100%;
    height: 124px;
  }
`;
const StyledCardContent = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
`;

const StyledLeftContent = styled.div`
  width: 150px;
  height: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StyledUserName = styled.span`
  color: #f42c04;
  font-family: lobster;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;

const StyledCardHeading = styled.span`
  color: #000;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledPlayButton = styled.button<{
  $mode: "light" | "dark";
}>`
  width: 90px;
  height: 24px;
  border: 1.5px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.light
        : props.theme.palette.primary.dark};
  background: #000;
  transform: skew(-10deg);
  border-radius: 6px;
  color: #fff;
  font-family: Poppins;
  font-size: 10px;
  cursor: pointer;
`;

const StyledGirlImageContainer = styled.div`
  position: absolute;
  width: 150px;
  height: 100%;
  right: 10px;
`;
const StyledImage = styled(Image)`
  object-fit: contain;
`;

const StyledLogo = styled.p`
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transform: rotate(90deg);
  width: 100px;
  position: absolute;
  top: 60px;
  left: -38px;
`;

const StyledLogoSpan = styled.span`
  color: #f42c04;
`;

export {
  StyledInvitationCard,
  StyledCardContent,
  StyledGirlImageContainer,
  StyledLogo,
  StyledLogoSpan,
  StyledLeftContent,
  StyledUserName,
  StyledCardHeading,
  StyledPlayButton,
  StyledImage,
};
