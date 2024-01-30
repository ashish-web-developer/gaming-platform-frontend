import styled from "styled-components";

const StyledMobileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;
const StyledMobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledMobileChatSearchIcon = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  border: none;
  margin: 0px;
  padding: 0px;
`;

const StyledHamBurgerIcon = styled.span<{
  $mode: "light" | "dark";
}>`
  display: inline-block;
  width: 30px;
  height: 3px;
  background: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  position: relative;
  top: 10px;
  cursor: pointer;
  &::before {
    content: "";
    width: 25px;
    height: 3px;
    position: absolute;
    right: 0px;
    top: 10px;
    background: ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  }
`;

const StyledWelcomingText = styled.h1<{
  $mode: "light" | "dark";
}>`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  text-align: center;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-size: 30px;
`;
const StyledWelcomingSpan = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
`;

const StyledBackCta = styled.button`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.palette.primary.dark};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledChatUserProfile = styled.div<{
  $mode: "light" | "dark";
}>`
  height: 50px;
  width: auto;
  border-radius: 25px;
  background: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px;
  gap: 12px;
  padding-right: 24px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  box-shadow: ${(props) =>
    props.$mode == "light"
      ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      : "0px 4px 4px 0px rgba(255, 255, 255, 0.25)"};
`;

const StyledAvatar = styled.span`
  display: inline-block;
  border-radius: 40px;
  border: 2px solid #fff;
  width: 40px;
  height: 40px;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledUserName = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.main
      : props.theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledMessageCount = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export {
  StyledMobileHeaderContainer,
  StyledMobileHeader,
  StyledMobileChatSearchIcon,
  StyledHamBurgerIcon,
  StyledWelcomingText,
  StyledWelcomingSpan,
  StyledBackCta,
  StyledChatUserProfile,
  StyledAvatar,
  StyledUserDetails,
  StyledUserName,
  StyledMessageCount,
};
