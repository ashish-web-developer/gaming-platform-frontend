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
  gap: 20px;
`;

const StyledUserProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  gap: 6px;
  padding-right: 18px;
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

const StyledChevronIcon = styled(Image)``;

export {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledChevronIcon,
};
