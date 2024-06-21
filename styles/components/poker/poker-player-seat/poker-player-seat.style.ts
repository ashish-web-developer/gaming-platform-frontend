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
`;

const StyledPokerChipsImage = styled(Image)``;

const StyledPokerPlayerWrapper = styled.div<{
  $align: "left" | "right" | "down";
}>`
  position: absolute;
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

export {
  StyledPokerPlayerSeatWrapper,
  StyledPokerPlayerWrapper,
  StyledPokerChipsImage,
};
