import styled from "styled-components";

const StyledNav = styled.div`
  position: absolute;
  top: 0px;
  left: -5rem;
  width: 60px;
  height: 135px;
  border-radius: 0px 0px 30px 30px;
  background: ${({ theme }) => theme.palette.nav.background};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 4;
`;

export { StyledNav };
