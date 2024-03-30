import styled from "styled-components";
import Image from "next/image";

const StyledChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const StyledWelcomeText = styled.div`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
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
  gap: 16px;
`;

const StyledUserProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  gap: 6px;
  padding-right: 18px;
  position: relative;
`;

const StyledUserProfileImage = styled(Image)<{
  $mode: "light" | "dark";
}>`
  margin-left: 3px;
  border: 2px solid
    ${(props) =>
      props.$mode == "dark"
        ? props.theme.palette.primary.light
        : props.theme.palette.primary.dark};
  border-radius: 50%;
`;

const StyledIconCta = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledChevronIcon = styled(Image)``;

const StyledNotificationCta = styled.button<{
  $notification_count: number;
}>`
  background: transparent;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  height: 40px;
  width: 40px;
  border-radius: 6px;
  position: relative;
  ${(props) =>
    Boolean(props.$notification_count) &&
    `
      &::after {
        content:"${String(props.$notification_count).padStart(2, "0")}" ;
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background: ${props.theme.palette.primary.main};
        top: 0px;
        right: 0px;
        transform: translate(50%, -50%);
        border: 2px solid ${props.theme.palette.primary.dark};
        color: ${props.theme.palette.primary.dark};
        font-family: ${props.theme.fontFamily.lobster};
      }
  `}
`;

const StyledBellIcon = styled(Image)``;

export {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledIconCta,
  StyledChevronIcon,
  StyledNotificationCta,
  StyledBellIcon,
};
