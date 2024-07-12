import Image from "next/image";
import styled from "styled-components";

const StyledPokerPlayerSeatWrapper = styled.div<{
  $seat_number: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  $is_dealer: boolean;
}>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
      bottom:${[0, 1, 5, 6].includes(props.$seat_number) ? "80px" : "unset"};
      right:${[2, 3, 4].includes(props.$seat_number) ? "80px" : "unset"};
    }
  `}
`;

const StyledPokerChipsImage = styled(Image)<{
  $is_folded: boolean;
}>`
  opacity: ${(props) => (props.$is_folded ? "0.6" : "1")};
`;

const StyledPokerPlayerWrapper = styled.div<{
  $seat_number: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  ${(props) => {
    switch (props.$seat_number) {
      case 0:
      case 1:
        return `
          transform:translateX(-100%);
        `;
      case 2:
      case 3:
      case 4:
        return `
          transform:translateY(90%);
        `;
      case 5:
      case 6:
        return `
          transform:translateX(100%);
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
  $seat_number: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
    switch (props.$seat_number) {
      case 0:
      case 1:
        return `
          transform:translateX(100%);
        `;
      case 2:
      case 3:
      case 4:
        return `
          transform:translateY(-200%);
        `;
      case 5:
      case 6:
        return `
          transform:translateX(-100%);
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
