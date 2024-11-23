import styled from "styled-components";
import Image from "next/image";

const StyledContainer = styled.div`
  width: 300px;
  height: 330px;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  background: url("/login/onboard-banner.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
  position: relative;
`;

const StyledMainImageContainer = styled.div`
  width: 244px;
  height: 369px;
  position: absolute;
  bottom: 0px;
  right: -48px;
`;
const StyledImage = styled(Image)`
  object-fit: contain;
`;
const StyledMainText = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.info.main};
  line-height: 1;
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
`;

const StyledNameForm = styled.form`
  width: 90%;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 16px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 50%);
  background: url("/login/welcome-login-screen/background.png");
  background-size: cover;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const StyledNameInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.info.main};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 0px 16px;
  line-height: 2.75;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
`;

const StyledSubmitCta = styled.button<{
  $disabled_color: string;
}>`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1rem;
  line-height: 2.75;
  color: ${({ theme }) => theme.palette.info.main};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
  background: url("/login/welcome-login-screen/blood-splatter-1.jpg");
  background-size: 100% auto;
  width: 100%;
  cursor: pointer;
  &:disabled {
    color: ${(props) => props.$disabled_color};
    border-color: ${(props) => props.$disabled_color};
    cursor: not-allowed;
  }
`;

export {
  StyledContainer,
  StyledMainImageContainer,
  StyledImage,
  StyledMainText,
  StyledNameForm,
  StyledNameInput,
  StyledSubmitCta,
};
