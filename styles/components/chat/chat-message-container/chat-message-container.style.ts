import styled from "styled-components";

const StyledMessageContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledDetailsWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
`;
const StyledWrapper = styled.div<{
  $gap?: string;
}>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap ?? 0};
`;

const StyledName = styled.h5`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 1.25rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.125rem;
  }
`;

const StyledMessageCount = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.primary.light};
`;
const StyledGroupAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledChatMessageContentContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 70px);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex-grow: 1;
  padding: 16px 16px 40px 16px;
`;

const StyledUserProfileVectorWrapper = styled.div`
  position: absolute;
  transform: translateY(-50%);
  right: 50px;
`;

export {
  StyledMessageContainer,
  StyledDetailsWrapper,
  StyledWrapper,
  StyledName,
  StyledMessageCount,
  StyledGroupAvatar,
  StyledChatMessageContentContainer,
  StyledUserProfileVectorWrapper,
};
