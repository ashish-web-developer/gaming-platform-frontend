import styled from "styled-components";

const StyledSliderWrapper = styled.div`
  position: absolute;
  top: -60px;
  display: flex;
`;

const StyledSliderContainer = styled.div`
  width: 500px;
  height: 50px;
  border-radius: 30px 0px 0px 30px;
  border: 3px solid ${({ theme }) => theme.palette.secondary.main};
  border-right-width: 0px;
  background: rgba(245, 213, 71, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSliderConfirmCta = styled.button`
  height: 50px;
  border: 3px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0px 30px 30px 0px;
  background: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  font-size: 1.125rem;
  padding: 0px 1rem;
  cursor: pointer;
`;

const StyledRangeSliderValue = styled.span`
  position: absolute;
  left: 0px;
  top: -50px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  white-space: nowrap;
`;

const StyledRangeSliderInput = styled.input.attrs({
  type: "range",
})`
  --track-height: 16px;
  --thumb-size: 25px;
  position: relative;
  z-index: 3;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 450px;
  &::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.palette.secondary.main};
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-moz-range-track {
    background: ${({ theme }) => theme.palette.secondary.main};
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 10px;
    height: var(--track-height);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: #fff;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    margin-top: -6px;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: #fff;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    margin-top: -6px;
  }
`;

export {
  StyledSliderWrapper,
  StyledSliderContainer,
  StyledSliderConfirmCta,
  StyledRangeSliderInput,
  StyledRangeSliderValue,
};
