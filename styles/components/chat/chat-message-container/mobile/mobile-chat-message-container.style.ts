import styled from "styled-components";

type IStyledMobileChatMessageContainer = {
  $show_memory_game: boolean;
};

const StyledMobileChatMessageContainer = styled.div<IStyledMobileChatMessageContainer>`
  width: 100%;
  flex-grow: 1;
  border-radius: 30px;
  border: 3px solid
    ${({ theme }) => theme.palette.chat_messages_container.border};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 30px 20px 40px 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: ${(props) =>
    props.$show_memory_game ? "calc(100% - 234px)" : "calc(100% - 80px)"};
`;

export { StyledMobileChatMessageContainer };
