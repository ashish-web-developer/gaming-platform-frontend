import styled from "styled-components";

const StyledNotificationWrapper = styled.div`
  position: absolute;
  width: 285px;
  height: 375px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  top: calc(100% + 1rem);
  right: 250px;
  z-index: 2;
  overflow: hidden;
`;

const StyledNotificationHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
const StyledNotificationHeaderTitle = styled.h5`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledIconCta = styled.button`
  background: none;
  cursor: pointer;
  border: none;
`;

const StyledTabWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;
const StyledTabCta = styled.button<{
  $active: boolean;
}>`
  border: none;
  background: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.primary.dark};
  border: ${(props) =>
    props.$active ? `2px solid ${props.theme.palette.primary.dark}` : "none"};
  padding: 3px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledNotificationCount = styled.span<{
  $mode: "light" | "dark";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.dark};
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  border-radius: 4px;
  background: ${(props) =>
    props.$mode == "dark"
      ? props.theme.palette.secondary.dark
      : props.theme.palette.primary.light};
  color: #000;
`;
const StyledNotificationContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  overflow: scroll;
`;
const StyledNotificationContent = styled.div`
  width: 100%;
`;

export {
  StyledNotificationWrapper,
  StyledNotificationHeader,
  StyledNotificationHeaderTitle,
  StyledIconCta,
  StyledTabWrapper,
  StyledTabCta,
  StyledNotificationCount,
  StyledNotificationContentWrapper,
  StyledNotificationContent,
};
