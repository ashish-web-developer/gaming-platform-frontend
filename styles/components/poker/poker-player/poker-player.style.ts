import Image from "next/image";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledPokerPlayer = styled.div<{
  $align: "left" | "right" | "down";
  $show_action_cta: boolean;
}>`
  position: absolute;
  display: flex;
  gap: 20px;
  ${(props) => {
    switch (props.$align) {
      case "left":
        return `
          top: 50%;
          left:0px;
          flex-direction:row;
          transform: translate(-46%, -50%);
        `;
      case "right":
        return `
          flex-direction:row-reverse;
          top:50%;
          right:0px;
          transform: translate(46%, -50%);
        `;
      case "down":
        return `
          flex-direction:column-reverse;
          bottom: 0px;
          left:50%;
          transform:${
            props.$show_action_cta
              ? "translate(-50%,50%)"
              : "translate(-50%,64%)"
          };
        `;
    }
  }}
`;

const StyledPokerPlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const StyledPokerPlayerProfileWrapper = styled.div<{
  $is_active: boolean;
  $is_bettor: boolean;
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  background: ${(props) =>
    props.$is_bettor
      ? "linear-gradient(to right, #ffed65 25%, #59ffa0 100%)"
      : "#fff"};
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${(props) =>
      props.$is_active
        ? props.theme.palette.success.main
        : props.theme.palette.warning.main};
    right: 6px;
    top: 6px;
    border-radius: 50%;
    border: 2px solid #000;
  }
`;
const StyledPokerPlayerProfile = styled.div<{
  $is_bettor: boolean;
}>`
  width: ${(props) => (props.$is_bettor ? "86px" : "90px")};
  height: ${(props) => (props.$is_bettor ? "86px" : "90px")};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.primary.main};
`;
const StyledPokerPlayerProfileImage = styled(Image)`
  object-fit: cover;
`;

const StyledTotalChips = styled.span`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.625rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
`;

const StyledBetChipsWrapper = styled.div<{
  $align: "left" | "right" | "down";
}>`
  display: flex;
  align-items: center;
  gap: 24px;
  ${(props) => {
    switch (props.$align) {
      case "left":
        return `
          flex-direction:row;
        `;
      case "right":
        return `
          flex-direction:row-reverse;
        `;
      case "down":
        return `
          flex-direction:column-reverse;
        `;
    }
  }}
`;

const StyledPokerChipsWrapper = styled.div<{
  $align: "left" | "right" | "down";
  $is_dealer: boolean;
}>`
  position: relative;
  width: 50px;
  height: 50px;
  ${(props) =>
    props.$is_dealer &&
    `
      &::after {
        content: "D";
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: 4px solid #fff;
        border-radius: 50%;
        background: #000;
        font-family: ${props.theme.fontFamily.lobster};
        font-size: 1.5rem;
        color: ${props.theme.palette.success.main};
        bottom:${
          props.$align == "left" || props.$align == "right" ? "20px" : "unset"
        };
        transform:${
          props.$align == "down" ? "translateX(-100%)" : "translateY(-100%)"
        };
        right:${props.$align == "down" ? "20px" : "unset"};
        z-index:6;
      }
    `}
`;

const StyledPokerChipsImage = styled(Image)``;

const StyledBetChips = styled.span`
  padding: 0.375rem 1rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  font-size: 1.125rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.625rem;
`;

export {
  StyledPokerPlayer,
  StyledPokerPlayerWrapper,
  StyledPokerPlayerProfileWrapper,
  StyledPokerPlayerProfile,
  StyledPokerPlayerProfileImage,
  StyledTotalChips,
  StyledBetChipsWrapper,
  StyledPokerChipsWrapper,
  StyledPokerChipsImage,
  StyledBetChips,
};
