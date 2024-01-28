import styled from "styled-components";

const StyledCountDown = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.palette.primary.light};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  left: 45%;
  top: 25%;
`;

const StyledOutlinedText = styled.span`
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.primary.contrast};
  font-size: 70px;
`;

export { StyledCountDown, StyledOutlinedText };
