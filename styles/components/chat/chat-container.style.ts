import styled from "styled-components";

type IStyledPage = {
  $background_image: boolean;
};
const StyledPage = styled.div<IStyledPage>`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  background-image: ${(props) =>
    props.$background_image ? "url('/chat/background.jpg')" : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const StyledChatContainer = styled.div`
  width: 75rem;
  height: auto;
`;

const StyledChatMainContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  height: calc(100vh - 200px);
  gap: 40px;
`;

const StyledChatMainContentContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 140px;
  gap: 24px;
  min-height: 0;
  min-width: 0;
`;

const StyledMessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll; /* NEW */
`;

const StyledChatInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledGroupSuggestionWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
`;

const StyledNotificationContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledNotificationHeading = styled.h6<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;

export {
  StyledPage,
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledGroupSuggestionWrapper,
  StyledNotificationContainer,
  StyledNotificationHeading,
};
