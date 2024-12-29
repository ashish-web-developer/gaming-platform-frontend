import styled from "styled-components";

// slider
import Slider from "react-rangeslider";

const StyledSliderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSliderWrapper = styled.div`
  width: 300px;
  height: 40px;
  border: 2px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 30px 0px 0px 30px;
  background: rgba(239, 35, 60, 0.1);
`;

const StyledSlider = styled(Slider)`
  width: 260px;
  & .rangeslider-horizontal {
    height: 8px;
  }
  & .rangeslider__fill {
    background-color: #90e39a;
  }
  & .rangeslider__handle {
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.info.main};
    &:after {
      display: none;
    }
    & .rangeslider__handle-tooltip {
      width: auto;
      height: auto;
      margin-top:-10px;
      padding: 6px 1rem;
      background: rgba(239, 35, 60, 0.1);
      border: 2px solid ${({ theme }) => theme.palette.info.main};
      border-radius: 30px;
      font-family: ${({ theme }) => theme.fontFamily.bangers};
      & span {
        margin-top: 0;
        font-size: 1rem;
        white-space: nowrap;
      }
      &:after {
        display: none;
      }
    }
  }
`;

const StyledConfirmCta = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  height: 40px;
  padding: 0px 16px;
  background: rgba(239, 35, 60, 0.1);
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 0px 30px 30px 0px;
  color: ${({ theme }) => theme.palette.info.main};
  display:flex;
  align-items:center;
`;

export {
  StyledSliderContainer,
  StyledSliderWrapper,
  StyledSlider,
  StyledConfirmCta,
};
