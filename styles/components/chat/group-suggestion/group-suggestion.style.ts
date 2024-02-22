import styled from "styled-components";

const StyledGroupSuggestionWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
`;

const StyledDetailsWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 1.25rem;
`;

const StyledGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem;
  height: calc(100% - 60px);
  overflow: scroll;
`;

export { StyledGroupSuggestionWrapper, StyledDetailsWrapper, StyledGroupList };
