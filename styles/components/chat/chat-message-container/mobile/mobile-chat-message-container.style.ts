import styled from "styled-components";

const StyledMobileChatMessageContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  border-radius: 30px;
  border: 3px solid
    ${({ theme }) => theme.palette.chat_messages_container.border};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 30px 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: calc(100% - 80px);
`;

export { StyledMobileChatMessageContainer };
