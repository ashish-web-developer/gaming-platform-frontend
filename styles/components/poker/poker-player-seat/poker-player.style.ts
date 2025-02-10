import styled from "styled-components";

type IStyledPokerPlayerWrapperProps = {
  $background_url: string | null;
} & (
  | {
      $is_dealer: true;
      $seat_index: number;
    }
  | {
      $is_dealer: false;
    }
);

const StyledPokerPlayerWrapper = styled.div<IStyledPokerPlayerWrapperProps>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid ${({ theme }) => theme.palette.info.main};
  position: absolute;
  z-index: 1;
  background: #000;
  ${(props) =>
    props.$background_url &&
    `
    background: url(${props.$background_url});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
  `}
  &::after {
    ${(props) =>
      props.$is_dealer &&
      `
        content: "D";
        font-family: ${props.theme.fontFamily.bangers};
        line-height: 1;
        color: ${props.theme.palette.info.main};
        padding: 6px 14px 8px 14px;
        position: absolute;
        border: 3px solid ${props.theme.palette.success.main};
        border-radius: 30px;
        background: ${props.theme.palette.primary.main};
        transform-origin: center;
        top: 50%;
        left: 50%;
    `}
    ${(props) => {
      if (props.$is_dealer) {
        switch (props.$seat_index) {
          case 0:
            return `
          transform:translate(20%, 100%) rotate(-125deg);
          `;

          case 1:
            return `
          transform:translate(-115%, 120%) rotate(-70deg);
          `;
          case 2:
            return `
          transform:translate(-215%, -15%) rotate(-20deg);
          `;
          case 3:
            return `
          transform:translate(-230%, -95%) rotate(0deg);
          `;
          case 4:
            return `
          transform:translate(-220%, -95%);
          `;
          case 5:
            return `
          transform:translate(-230%, -105%) rotate(5deg);
          `;
          case 6:
            return `
          transform:translate(-130%, -220%) rotate(-125deg);
          `;
          case 7:
            return `
          transform:translate(5%, -240%) rotate(-80deg);
          `;
          case 8:
            return `
          transform:translate(100%, -118%) rotate(-25deg)
          `;
        }
      }
    }}
  }
`;

const StyledHoleCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 40px);
  position: relative;
  transform: rotate(16deg);
  & > :first-child {
    rotate: -6deg;
  }
  & > :last-child {
    left: -20px;
    rotate: 6deg;
  }
`;

const StyledPokerPlayerDetails = styled.div`
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0;
  z-index: 2;
`;

const StyledPlayerName = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.info.main};
  white-space: nowrap;
  line-height: 1;
`;
const StyledPlayerAmount = styled.h6`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.info.main};
  white-space: nowrap;
  line-height: 1;
`;
const StyledAmountBettedWrapper = styled.div<{
  $seat_index: number;
}>`
  position: absolute;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px 6px 8px;
  gap: 6px;
  z-index: 2;
  ${(props) => {
    console.log("value of seat index", props.$seat_index);
    switch (props.$seat_index) {
      case 0:
        return `
          top:20px;
          left:-60px;
        `;
      case 1:
        return `
          top:20px;
          left:-90px;
        `;
      case 2:
        return `
        top:15px;
        left:-60px;
        `;
      case 3:
      case 4:
      case 5:
        return `
          top:-80px;
        `;
      case 6:
        return `
          top:15px;
          left:130px;
        `;
      case 7:
        return `
          top:15px;
          left:160px;
        `;
      case 8:
        return `
          top:20px;
          left:130px;
        `;
    }
  }}
`;

const StyledAmountBetted = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.info.main};
  white-space: nowrap;
  line-height: 1;
`;

const StyledSpinner = styled.span`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 6px solid ${({ theme }) => theme.palette.success.main};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
  0% {
      transform:translate(-50%, -50%) rotate(0deg);
  }
  100% {
      transform:translate(-50%, -50%) rotate(360deg);
  }

`;

export {
  StyledPokerPlayerWrapper,
  StyledHoleCardWrapper,
  StyledPokerPlayerDetails,
  StyledPlayerName,
  StyledPlayerAmount,
  StyledAmountBettedWrapper,
  StyledAmountBetted,
  StyledSpinner,
};
