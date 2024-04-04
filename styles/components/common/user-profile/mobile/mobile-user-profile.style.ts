import styled from "styled-components";
import Image from "next/image";

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 6;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

const StyledModalWrapper = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.6;
`;

const StyledUserProfileContentWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 28px;
  position: relative;
`;
const StyledBackButton = styled.button`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const StyledHeaderText = styled.h3`
  color: ${({ theme }) => theme.palette.primary.dark};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledChatProfileContent = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledProfileWrappper = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: transparent;
  border: 5px solid
    ${(props) =>
      props.$mode == "dark"
        ? props.theme.palette.primary.light
        : props.theme.palette.primary.dark};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUserProfile = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

const StyledUploadButton = styled.button`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
`;

const StyledPointsTag = styled.div`
  position: absolute;
  left: 0px;
  top: 20%;
  transform: translateX(-50%);
  height: 36px;
  border: 3px solid ${({ theme }) => theme.palette.primary.dark};
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 1rem;
`;

const StyledPointsImage = styled(Image)`
  object-fit: contain;
`;
const StyledPointsText = styled.span<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 2px;
`;

const StyledUserDetailsWrapper = styled.div`
  transform: rotate(-10deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
`;

const StyledName = styled.h3`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 40px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  text-align: center;
`;
const StyledUserNameWrapper = styled.div<{
  $mode: "light" | "dark";
}>`
  height: 30px;
  border: 2px solid
    ${(props) =>
      props.$mode == "dark"
        ? props.theme.palette.primary.light
        : props.theme.palette.primary.dark};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 140%;
    background: transparent;
    border: 2px solid
      ${(props) =>
        props.$mode == "dark"
          ? props.theme.palette.primary.light
          : props.theme.palette.primary.dark};
    border-radius: 25px;
  }
`;

const StyledUserName = styled.p`
  color: ${({ theme }) => theme.palette.primary.dark};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledCtaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 30px;
`;

const StyledIconCta = styled.button<{
  $mode: "light" | "dark";
}>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 1.5px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  background: ${(props) =>
    props.$mode == "light"
      ? "rgba(246, 174, 45,0.4)"
      : "rgba(162, 242, 99,0.4)"};
`;
export {
  StyledWrapper,
  StyledModalWrapper,
  StyledBackdrop,
  StyledUserProfileContentWrapper,
  StyledHeader,
  StyledBackButton,
  StyledHeaderText,
  StyledChatProfileContent,
  StyledProfileWrappper,
  StyledUserProfile,
  StyledUploadButton,
  StyledPointsTag,
  StyledPointsImage,
  StyledPointsText,
  StyledUserDetailsWrapper,
  StyledName,
  StyledUserNameWrapper,
  StyledUserName,
  StyledCtaWrapper,
  StyledIconCta,
};
