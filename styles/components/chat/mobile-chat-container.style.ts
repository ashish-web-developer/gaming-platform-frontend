import styled from "styled-components";

const StyledMobileChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 1.2rem;
  position: relative;
`;

const StyledTabWrapper = styled.div`
  height: 60px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  display: flex;
  grid-template-column: 1fr 1fr;
  gap: 12px;
  padding: 2px;
  margin-top: 1rem;
`;

const StyledTabCta = styled.button<{
  $active: boolean;
}>`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.25rem;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background: ${(props) =>
    props.$active ? props.theme.palette.secondary.main : "#000"};
  color: ${(props) =>
    props.$active ? "#000" : props.theme.palette.secondary.main};
`;

const StyledMainContent = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  height: 300px;
  width: 100%;
  margin-top: 1.25rem;
  height: calc(100% - 278px);
`;

const StyledUserList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  overflow: scroll;
  gap: 20px;
  padding: 1rem;
`;
export {
  StyledMobileChatContainer,
  StyledTabWrapper,
  StyledTabCta,
  StyledMainContent,
  StyledUserList,
};
