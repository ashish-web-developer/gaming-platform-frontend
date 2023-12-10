import styled from "styled-components";

const StyledMobileChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 1rem;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.palette.secondary.main};
`;

export { StyledMobileChatContainer, StyledDivider };
