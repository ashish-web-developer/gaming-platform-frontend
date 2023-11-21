import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        background:${({ theme }) => theme.palette.primary.main};
        background-repeat:no-repeat;
        background-size:cover;
        display:flex;
        justify-content:center;
    }
`;

const StyledChatContainer = styled.div`
  width: 70rem;
  height: auto;
`;

const StyledChatMainContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 320px 1fr;
  height: calc(100vh - 200px);
  gap: 40px;
`;

const StyledChatMainContentContainer = styled.div`
  width: 100%;
  height: 100%;
  border-left: 2px solid ${({ theme }) => theme.palette.primary.green};
  padding-left: 40px;
`;

const StyledChatMainContent = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid red;
`;

export default GlobalStyles;

export {
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledChatMainContent,
};
