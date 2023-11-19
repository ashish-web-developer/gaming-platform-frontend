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
`;

const StyledChatMainContentContainer = styled.div``;

export default GlobalStyles;

export {
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
};
