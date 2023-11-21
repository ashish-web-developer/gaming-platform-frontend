import styled from "styled-components";

const StyledMessageContainer = styled.div`
  width: 100%;
  height: 100%;
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
export { StyledMessageContainer, StyledActiveUserName, StyledMessagesCount };
