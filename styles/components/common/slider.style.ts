import styled from "styled-components";

const StyledLabel = styled.label<{
  $mode: "light" | "dark";
}>`
  width: 80px;
  height: 35px;
  background: transparent;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  position: relative;
  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.palette.primary.dark};
    background: ${({ theme }) => theme.palette.primary.main};
    top: 50%;
    transform: translateY(-50%);
    background: url("common/slider/${(props) => props.$mode}-moon.png"),
      ${({ theme }) => theme.palette.primary.main};
    background-size: cover;
    background-repeat: no-repeat;
    right: -2px;
  }
`;

const StyledSliderInput = styled.input`
  display: none;
  &:checked + ${StyledLabel}:after {
    left: -2px;
  }
`;

export { StyledLabel, StyledSliderInput };
