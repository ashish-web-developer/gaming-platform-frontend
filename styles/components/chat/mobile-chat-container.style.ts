import styled from "styled-components";

const StyledMobileChatContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 1.2rem;
  position: relative;
  ${(props) =>
    props.$mode == "light" &&
    `
    background:url("/chat/mobile-background.jpg");
    background-size:cover;
  `}
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
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.25rem;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return `
          background:${
            props.$active
              ? props.theme.palette.secondary.main
              : props.theme.palette.primary.main
          };
          color:${
            props.$active
              ? props.theme.palette.primary.main
              : props.theme.palette.primary.light
          };
        `;
      case "light":
        return `
          background:${
            props.$active
              ? props.theme.palette.secondary.main
              : props.theme.palette.primary.main
          };
          color:${props.theme.palette.primary.dark};
        `;
    }
  }}
`;

const StyledMainContent = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  height: 300px;
  width: 100%;
  margin-top: 1.25rem;
  height: calc(100% - 278px);
`;

const StyledMessageWrapper = styled.div<{
  type: "chat" | "group";
}>`
  width: 100%;
  height: ${(props) =>
    props.type == "group" ? "calc(100% - 300px)" : "calc(100% - 250px)"};
  margin-top: 65px;
  margin-top: ${(props) => (props.type == "group" ? "20px" : "65px")};
`;

const StyledChatInputWrapper = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 20px;
`;

const StyledUserList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  overflow: scroll;
  gap: 20px;
  padding: 1rem;
`;

const StyledGroupAvatarWrapper = styled.div`
  margin-top: 24px;
`;
const StyledSpan = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
`;

const StyledGroupAvatar = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
`;

const StyledInviteDialogWrapper = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;
export {
  StyledMobileChatContainer,
  StyledTabWrapper,
  StyledTabCta,
  StyledMainContent,
  StyledUserList,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledGroupAvatarWrapper,
  StyledSpan,
  StyledGroupAvatar,
  StyledInviteDialogWrapper,
};
