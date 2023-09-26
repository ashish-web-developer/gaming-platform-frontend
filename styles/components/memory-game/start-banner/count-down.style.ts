import styled from "styled-components";

const StyledCountDown = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.palette.start_banner.timer.text_left};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  left: 45%;
  top: 25%;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    font-size: 36px;
    top: 32%;
  }
`;

export { StyledCountDown };
