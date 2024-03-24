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

const StyledUploadModalWrapper = styled.div<{
  $is_modal_open: boolean;
}>`
  ${(props) =>
    props.$is_modal_open &&
    `
    position:absolute;
    width:100%;
    height:100%;
    background:transparent;
    z-index:3;
  `}
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.6;
`;

const StyledChatContainer = styled.div`
  width: 75rem;
  height: auto;
`;

const StyledChatMainContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 320px minmax(465px, 1fr) 320px;
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

const StyledGroupSuggestionContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  StyledUploadModalWrapper,
  StyledBackdrop,
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledGroupSuggestionContainer,
  StyledNotificationContainer,
  StyledNotificationHeading,
};
