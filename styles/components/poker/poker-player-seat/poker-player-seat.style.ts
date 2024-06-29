import Image from "next/image";
import styled from "styled-components";

const StyledPokerPlayerSeatWrapper = styled.div<{
  $align: "left" | "right" | "down";
  $is_dealer: boolean;
}>`
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    switch (props.$align) {
      case "left":
        return `
          top: 50%;
          left:0px;
          flex-direction:row;
          transform: translate(-36%, -50%);
        `;
      case "right":
        return `
          flex-direction:row-reverse;
          top:50%;
          right:0px;
          transform: translate(36%, -50%);
        `;
      case "down":
        return `
          flex-direction:column-reverse;
          bottom: 0px;
          left:50%;
          transform:translate(-50%,30%);
        `;
    }
  }}
  ${(props) =>
    props.$is_dealer &&
    `
    &::after{
      content:"D";
      position:absolute;
      display:flex;
      justify-content:center;
      align-items:center;
      background:${props.theme.palette.primary.main};
      width:40px;
      height:40px;
      border-radius:50%;
      border:4px solid #fff;
      font-family:${props.theme.fontFamily.lobster};
      font-size:1.5rem;
      color:${props.theme.palette.success.main};
      bottom:${
        props.$align == "left" || props.$align == "right" ? "80px" : "unset"
      };
      right:${props.$align == "down" ? "80px" : "unset"};
    }
  `}
`;

const StyledPokerChipsImage = styled(Image)<{
  $is_folded: boolean;
}>`
  opacity: ${(props) => (props.$is_folded ? "0.6" : "1")};
`;

const StyledPokerPlayerWrapper = styled.div<{
  $align: "left" | "right" | "down";
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  ${(props) => {
    switch (props.$align) {
      case "left":
        return `
        transform:translateX(-100%);
        `;
      case "right":
        return `
        transform:translateX(100%);
        `;
      case "down":
        return `
        transform:translateY(100%);
        `;
    }
  }}
`;

const StyledCardContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  transform: rotate(-30deg);
  left: -34px;
  bottom: 4px;
`;
const StyledCardWrapper = styled.div<{
  $rotate: string;
}>`
  transform: rotate(${(props) => props.$rotate});
  margin-right: -40px;
  &:last-child {
    margin-right: 0px;
  }
`;

const StyledPokerPlayerBuyInAmount = styled.span`
  position: relative;
  z-index: 3;
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  padding: 10px 16px;
  font-size: 1rem;
  white-space: nowrap;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 10px;
  background: rgba(245, 213, 71, 0.2);
`;

const StyledPokerActionCtaWrapper = styled.div`
  position: absolute;
  bottom: 16px;
`;
const StyledBettedAmount = styled.div<{
  $align: "left" | "right" | "down";
}>`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  font-size: 1.125rem;
  padding: 4px 16px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  white-space: nowrap;
  border-radius: 10px;
  ${(props) => {
    switch (props.$align) {
      case "left":
        return `
          left:72px;
        `;
      case "right":
        return `
          right:72px;
        `;
      case "down":
        return `
          bottom:72px;
        `;
    }
  }}
`;

export {
  StyledPokerPlayerSeatWrapper,
  StyledPokerPlayerBuyInAmount,
  StyledPokerPlayerWrapper,
  StyledCardContainer,
  StyledCardWrapper,
  StyledPokerChipsImage,
  StyledPokerActionCtaWrapper,
  StyledBettedAmount,
};
