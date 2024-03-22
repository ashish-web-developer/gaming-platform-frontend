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
};
