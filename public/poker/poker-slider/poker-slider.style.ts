import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: -60px;
  display: flex;
`;

const StyledRangeSliderWrapper = styled.div`
  width: 500px;
  height: 50px;
  border-radius: 30px 0px 0px 30px;
  border: 3px solid ${({ theme }) => theme.palette.secondary.main};
  border-right-width: 0px;
  background: rgba(245, 213, 71, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledRangeSlider = styled.div`
  width: 450px;
  & > .slider > .rangeslider {
    & > .rangeslider__fill {
      background: ${({ theme }) => theme.palette.secondary.main};
    }
    & > .rangeslider__handle {
      width: 25px;
      height: 25px;
      border: 2px solid ${({ theme }) => theme.palette.primary.main};
      background: #fff;
      &::after {
        display: none;
      }
    }
  }
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

const StyledRangeSliderValue = styled.span<{
  $left: number;
}>`
  position: absolute;
  left: ${(props) => props.$left}px;
  top: -58px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: rgba(245, 213, 71, 0.2);
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  white-space: nowrap;
`;

const StyledPolygonVectorWrapper = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -29px;
`;
export {
  StyledContainer,
  StyledRangeSliderWrapper,
  StyledRangeSlider,
  StyledSliderConfirmCta,
  StyledRangeSliderValue,
  StyledPolygonVectorWrapper,
};
