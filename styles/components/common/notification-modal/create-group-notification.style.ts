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
`;
const StyledCtaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  ${(props) =>
    props.$show_background &&
    `
        background:#fff;
        color:#000;
    `}
`;

const StyledInfoNotification = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  padding: 0.5rem 1rem;
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
};
