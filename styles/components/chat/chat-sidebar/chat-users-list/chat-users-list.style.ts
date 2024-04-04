import styled from "styled-components";

const StyledUsersListWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 405px);
  overflow: auto;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  padding: 1rem 1rem 0 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: relative;
    height: auto;
  }
`;

const StyledTag = styled.h6`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  margin-bottom: 0.75rem;
`;

const StyledUserList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  overflow: scroll;
  gap: 20px;
`;

export { StyledUsersListWrapper, StyledTag, StyledUserList };
