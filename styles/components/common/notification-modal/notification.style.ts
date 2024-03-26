import styled from "styled-components";
import Image from "next/image";

const StyledGroupNotificationWrapper = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  padding: 0.5rem 1rem;
  display: flex;
  gap: 8px;
`;
const StyledUserAvatar = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 45px;
    height: 45px;
    border-radius: 6px;
  }
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
`;
const StyledGroupNotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StyledMessage = styled.div<{
  $mode: "light" | "dark";
}>`
  color: ${(props) => (props.$mode == "light" ? "#000" : "#fff")};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;
const StyledCtaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1.125rem;
  }
`;
const StyledCta = styled.button<{
  $show_background: boolean;
}>`
  border: 1px solid ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  background: none;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  ${(props) =>
    props.$show_background &&
    `
        background:#fff;
        color:#000;
    `}
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 4px 16px;
    font-size: 0.85rem;
  }
`;

const StyledInfoNotification = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  padding: 0.5rem 1rem;
`;

const StyledNotificationDate = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 12px;
  color: ${({ theme }) => theme.palette.primary.dark};
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.875rem;
  }
`;

export {
  StyledGroupNotificationWrapper,
  StyledUserAvatar,
  StyledAvatarImage,
  StyledMessage,
  StyledGroupNotificationContent,
  StyledCtaWrapper,
  StyledCta,
  StyledInfoNotification,
  StyledNotificationDate,
};
