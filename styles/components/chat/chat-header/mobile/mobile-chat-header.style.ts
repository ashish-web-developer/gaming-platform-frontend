import styled from "styled-components";
import Image from "next/image";

const StyledMobileChatHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMobileHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledUserProfileImageWrapper = styled.div`
  display: inline-flex;
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

const StyledBackCta = styled.button`
  width: 30px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
`;

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
  &::after {
    content: "${(props) => String(props.$notification_count).padStart(2, "0")}";
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
    top: 0px;
    right: 0px;
    transform: translate(50%, -50%);
    border: 2px solid ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.primary.dark};
    font-family: ${({ theme }) => theme.fontFamily.lobster};
  }
`;
const StyledBellIcon = styled(Image)``;

const StyledHeaderMessage = styled.h1<{
  $mode: "light" | "dark";
}>`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.5rem;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
  margin-top: 54px;
`;

const StyledSpan = styled.span<{
  $color: string;
}>`
  color: ${(props) => props.$color};
`;

export {
  StyledMobileChatHeaderContainer,
  StyledMobileHeaderTop,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledIconCta,
  StyledChevronIcon,
  StyledBackCta,
  StyledNotificationCta,
  StyledBellIcon,
  StyledHeaderMessage,
  StyledSpan,
};
