import styled from "styled-components";

const StyledRangeSliderWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  z-index: 3;
  width: 300px;
  & > .slider > .rangeslider {
    & > .rangeslider__fill {
      background: ${({ theme }) => theme.palette.secondary.main};
    }
    & > .rangeslider__handle {
      width: 40px;
      height: 40px;
      border: 3px solid ${({ theme }) => theme.palette.secondary.main};
      background: ${({ theme }) => theme.palette.primary.main};
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: ${({ theme }) => theme.fontFamily.lobster};
      color: ${({ theme }) => theme.palette.success.main};
      font-size: 0.875rem;
      &::after {
        display: none;
      }
    }
  }
`;

const StyledConfirmCta = styled.button<{
  $left: number;
}>`
  position: absolute;
  left: ${(props) => props.$left - 65}px;
  top: -40px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  background: ${({ theme }) => theme.palette.primary.main};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  white-space: nowrap;
  font-size: 0.875rem;
`;

export { StyledRangeSliderWrapper, StyledConfirmCta };
