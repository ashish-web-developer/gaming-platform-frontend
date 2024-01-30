import styled from "styled-components";

const StyledMobileChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 1.2rem;
  position: relative;
`;

const StyledMainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 2 * 1.2rem - 152px);
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledDivider = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: 2px;
  background: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
`;

const StyledBottomContainer = styled.div`
  width: 100%;
  flex-basis: 50px;
  display: flex;
  justify-content: space-between;
`;

const StyledInvitationCta = styled.button`
  background: transparent;
  border: none;
`;

export {
  StyledMobileChatContainer,
  StyledDivider,
  StyledMainContainer,
  StyledBottomContainer,
  StyledInvitationCta,
};
