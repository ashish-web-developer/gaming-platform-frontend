import styled from "styled-components";

const StyledChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const StyledWelcomeText = styled.div`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: Lobster;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledSpan = styled.span`
  color: ${({ theme }) => theme.palette.primary.light};
`;

const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledUserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledUserImgContainer = styled.span<{
  $mode: "light" | "dark";
}>`
  background: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return `
          border: 3px solid ${props.theme.palette.primary.light};
        `;
      case "light":
        return `
          border: 3px solid ${props.theme.palette.primary.dark};
        `;
    }
  }}
`;

const StyledUserImg = styled.span<{
  $mode: "light" | "dark";
}>`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
`;

const StyledUserData = styled.span`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-family: lobster;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledUserPointsContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledNotificationContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return `
          border: 2px solid ${props.theme.palette.primary.light};
          background: ${props.theme.palette.primary.dark};
        `;
      case "light":
        return `
          border: 2px solid ${props.theme.palette.primary.dark};
          background:${props.theme.palette.primary.light};
        `;
    }
  }}
`;

export {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileContainer,
  StyledUserImgContainer,
  StyledUserImg,
  StyledUserData,
  StyledText,
  StyledUserPointsContainer,
  StyledNotificationContainer,
};
