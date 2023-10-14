import styled from "styled-components";

const StyledCountDown = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.palette.secondary.red};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  right: 30px;
`;

export { StyledCountDown };
