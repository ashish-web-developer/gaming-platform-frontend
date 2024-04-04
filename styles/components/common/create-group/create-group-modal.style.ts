import styled from "styled-components";

const StyledCreateGroupModalWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: auto;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  top: calc(100% + 1rem);
  right: 0px;
  padding: 1.125rem;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 40%;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StyledHeaderMainText = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
`;

const StyledHeaderSubtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.secondary.dark};
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 12px;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
`;

const StyledInput = styled.input<{
  $mode: "light" | "dark";
}>`
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background: ${(props) =>
    props.$mode == "light"
      ? "rgba(238, 150, 75, 0.1)"
      : "rgba(162, 242, 99, 0.1)"};
  padding: 0px 12px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.75rem;
  &::placeholder {
    color: ${(props) =>
      props.$mode == "dark" ? "rgba(162, 242, 99, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  }
`;
const StyledTagWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 8px;
  flex-wrap: wrap;
`;
const StyledUserTag = styled.div`
  height: 35px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  backgroud: ${({ theme }) => theme.palette.primary.main};
  border-radius: 25px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 2.2rem;
  padding-right: 1rem;
`;
const StyledAvatarWrapper = styled.span`
  position: absolute;
  left: 0.5px;
`;
const StyledAvatarUsername = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledRemoveCta = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 8px;
`;

const StyledBottomCtaWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

const StyledCreateCta = styled.button`
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 8px;
  padding: 6px 20px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  background: linear-gradient(95deg, #ffe666 8.66%, #fb3 95.1%);
  cursor: pointer;
  &::disabled {
    opacity: 0.7;
  }
`;

export {
  StyledCreateGroupModalWrapper,
  StyledHeader,
  StyledTextWrapper,
  StyledHeaderMainText,
  StyledHeaderSubtitle,
  StyledIconButton,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledTagWrapper,
  StyledUserTag,
  StyledAvatarWrapper,
  StyledAvatarUsername,
  StyledRemoveCta,
  StyledBottomCtaWrapper,
  StyledCreateCta,
};
