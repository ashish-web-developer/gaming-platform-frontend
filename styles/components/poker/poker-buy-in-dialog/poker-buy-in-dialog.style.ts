import styled from "styled-components";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.8;
`;

const StyledPokerBuyInDialog = styled.dialog`
  width: 500px;
  height: 250px;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

const StyledMainText = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.rubik_glitch};
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 1.125rem;
  text-align: center;
`;

const StyledBuyInAmount = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.rubik_glitch};
  color: #fff;
  font-size: 0.875rem;
  padding: 8px 20px;
  background: ${({ theme }) => theme.palette.primary.light};
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  margin-top: 1rem;
`;

// const StyledBuyInSlider = styled.input.attrs({
//   type: "range",
// })`
//   /* removing default appearance */
//   -webkit-appearance: none;
//   appearance: none;
//   /* creating a custom design */
//   margin-top: 1.5rem;
//   width: 250px;
//   cursor: pointer;
//   outline: none;
//   background: ${({ theme }) => theme.palette.primary.main};
//   &::-webkit-slider-runnable-track {
//     background: ${({ theme }) => theme.palette.primary.light};
//     border: 2px solid ${({ theme }) => theme.palette.secondary.main};
//     border-radius: 10px;
//     height: 16px;
//   }
//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 20px;
//     height: 20px;
//     background: ${({ theme }) => theme.palette.secondary.main};
//     border-radius: 50%;
//   }
//   &::-moz-range-track {
//     background: ${({ theme }) => theme.palette.primary.light};
//     border: 2px solid ${({ theme }) => theme.palette.secondary.main};
//     border-radius: 10px;
//     height: 16px;
//   }

//   &::-moz-range-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 20px;
//     height: 20px;
//     background: ${({ theme }) => theme.palette.secondary.main};
//     border-radius: 50%;
//   }
// `;
const StyledBuyInSlider = styled.input.attrs({
  type: "range",
})`
  --track-height: 16px;
  --thumb-size: 20px;
  margin-top: 1.5rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 250px;
  &::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.palette.primary.light};
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-moz-range-track {
    background: ${({ theme }) => theme.palette.primary.light};
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 50%;
    margin-top: -3px;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 50%;
    margin-top: -3px;
  }
`;

export {
  StyledPokerBuyInDialog,
  StyledBackdrop,
  StyledMainText,
  StyledBuyInAmount,
  StyledBuyInSlider,
};
