import styled from "styled-components";

type IStyledMessageContent = {
  $justifyContent: "flex-start" | "flex-end";
};

type IStyledUserProfile = {
  $order: 1 | 2;
  $borderColor: string;
};

type IStyledMessage = {
  $order: 1 | 2;
  $borderColor: string;
};

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
  color: ${({ theme }) => theme.palette.primary.green};
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
  width: 400px;
  min-height: calc(100% - 70px);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex-grow: 1;
  padding: 16px;
`;

const StyledMessageContent = styled.div<IStyledMessageContent>`
  display: flex;
  gap: 16px;
  justify-content: ${(props) => props.$justifyContent};
`;
const StyledUserProfile = styled.div<IStyledUserProfile>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.$borderColor};
  order: ${(props) => props.$order};
`;

const StyledMessage = styled.div<IStyledMessage>`
  max-width: 260px;
  height: auto;
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 0px 16px 16px 16px;
  border: 2px solid ${(props) => props.$borderColor};
  padding: 12px;
  order: ${(props) => props.$order};
`;
export {
  StyledMessageContainer,
  StyledUserDetailsContainer,
  StyledActiveUserName,
  StyledMessagesCount,
  StyledChatMessageContentContainer,
  StyledMessageContent,
  StyledUserProfile,
  StyledMessage,
};
