import styled from "styled-components";

const StyledUsersList = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 70px);
  overflow: auto;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    position: static;
    height: auto;
  }
`;
export { StyledUsersList };
