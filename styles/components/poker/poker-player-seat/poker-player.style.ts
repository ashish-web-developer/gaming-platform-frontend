import styled from "styled-components";
import Image from "next/image";

const StyledPokerPlayerWrapper = styled.div<{
  $is_bettor: boolean;
  $is_active: boolean;
  $is_dealer: boolean;
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${(props) =>
    props.$is_bettor ? "linear-gradient(#FFED65 25%, #59FFA0 100%)" : "#fff"};
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${(props) =>
      props.$is_active
        ? props.theme.palette.success.main
        : props.theme.palette.warning.main};
    border: 2px solid #000;
    right: 6px;
    top: 6px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    &::after {
      width: 10px;
      height: 10px;
      top: 3px;
      right: 3px;
    }
    ${(props) =>
      props.$is_dealer &&
      `
    &::before {
      content: "D";
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 16px;
      height: 16px;
      background: ${props.theme.palette.primary.main};
      border: 2px solid #fff;
      position: absolute;
      left: -5px;
      bottom: 5px;
      z-index: 2;
      border-radius: 50%;
      font-family: ${props.theme.fontFamily.lobster};
      color: ${props.theme.palette.success.main};
      font-size: 0.75rem;
    }
      `}
  }
`;
const StyledPokerPlayer = styled.div<{
  $is_bettor: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$is_bettor ? "85px" : "90px")};
  height: ${(props) => (props.$is_bettor ? "85px" : "90px")};
  height: 90px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 55px;
    height: 55px;
  }
`;

const StyledUserProfileImage = styled(Image)`
  object-fit: cover;
`;

export { StyledPokerPlayerWrapper, StyledPokerPlayer, StyledUserProfileImage };
