import styled from "styled-components";

const StyledChatGroupListWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  margin-top: 20px;
  padding: 1rem;
`;

const StyledGroupTag = styled.h6`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  margin-bottom: 0.75rem;
`;

const StyledGroupListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  overflow: scroll;
  max-height: 300px;
`;

export { StyledChatGroupListWrapper, StyledGroupTag, StyledGroupListWrapper };
