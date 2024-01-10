import styled from "styled-components";

const StyledMessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledUserDetailsContainer = styled.div`
  width: 100%;
  flex-basis: 50px;
`;
const StyledActiveUserName = styled.h6`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledMessagesCount = styled.span`
  display: block;
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 4px;
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

export {
  StyledMessageContainer,
  StyledUserDetailsContainer,
  StyledActiveUserName,
  StyledMessagesCount,
  StyledChatMessageContentContainer,
};
