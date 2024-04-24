import Image from "next/image";
import styled from "styled-components";

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
const StyledPokerPlayerProfile = styled.div`
  width: 100px;
  height: 100px;
  border: 4px solid #fff;
  border-radius: 50%;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.palette.status.main};
    right: 6px;
    border-radius: 50%;
    border: 2px solid #000;
  }
`;
const StyledPokerPlayerProfileImage = styled(Image)`
  object-fit: contain;
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
        color: ${props.theme.palette.status.main};
        bottom:${
          props.$align == "left" || props.$align == "right" ? "20px" : "unset"
        };
        transform:${
          props.$align == "down" ? "translateX(-100%)" : "translateY(-100%)"
        };
        right:${props.$align == "down" ? "20px" : "unset"};
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

const StyledActionCtaWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 125px;
  z-index: -1;
`;
const StyledActionCtaCircle = styled.div`
  width: 250px;
  height: 125px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 125px 125px 0px 0px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: -48px;
`;
const StyledActionCtaInnerCircle = styled.div`
  width: 125px;
  height: 62.5px;
  border-radius: 62.5px 62.5px 0px 0px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: ${({ theme }) => theme.palette.primary.light};
`;

export {
  StyledPokerPlayer,
  StyledPokerPlayerWrapper,
  StyledPokerPlayerProfile,
  StyledPokerPlayerProfileImage,
  StyledTotalChips,
  StyledBetChipsWrapper,
  StyledPokerChipsWrapper,
  StyledPokerChipsImage,
  StyledBetChips,
  StyledActionCtaWrapper,
  StyledActionCtaCircle,
  StyledActionCtaInnerCircle,
};
