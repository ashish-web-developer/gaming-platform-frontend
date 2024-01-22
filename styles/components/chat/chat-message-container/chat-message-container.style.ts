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
const StyledActiveUserName = styled.h6<{
  $mode: "light" | "dark";
}>`
  font-family: lobster;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
`;

const StyledMessagesCount = styled.span<{
  $mode: "light" | "dark";
}>`
  display: block;
  font-family: lobster;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 4px;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
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
