import styled from "styled-components";

const StyledMobileChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 1.2rem;
`;

const StyledMainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 2 * 1.2rem - 152px);
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.palette.secondary.main};
`;

export { StyledMobileChatContainer, StyledDivider, StyledMainContainer };
