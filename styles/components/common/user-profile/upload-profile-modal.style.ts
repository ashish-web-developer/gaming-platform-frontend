import Image from "next/image";
import styled from "styled-components";

const StyledChatUserUploadWrapper = styled.dialog`
  width: 90%;
  max-width: 400px;
  height: 470px;
  background: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 25px;
  border: 3px solid ${({ theme }) => theme.palette.primary.dark};
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const StyledHeaderMainText = styled.h6`
  color: ${({ theme }) => theme.palette.primary.dar};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledModalContent = styled.div`
  width: 100%;
  padding: 0px 24px;
`;

const StyledUploadInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledUploadLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 270px;
  border: 3px dashed ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  position: relative;
  overflow: hidden;
`;
const StyledUploadedImage = styled(Image)`
  object-fit: cover;
`;
const StyledUploadInput = styled.input`
  width: 100%;
  height: 270px;
  display: none;
`;

const StyledUploadBottomInfoWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledText = styled.p`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledSaveCtaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const StyledSaveCta = styled.button`
  width: auto;
  height: auto;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background: linear-gradient(95deg, #ffe666 8.66%, #fb3 95.1%);
  padding: 6px 24px;
  color: #000;
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 5px;
  cursor: pointer;
`;

export {
  StyledChatUserUploadWrapper,
  StyledHeader,
  StyledHeaderMainText,
  StyledIconButton,
  StyledModalContent,
  StyledUploadInputContainer,
  StyledUploadInput,
  StyledUploadLabel,
  StyledUploadedImage,
  StyledUploadBottomInfoWrapper,
  StyledText,
  StyledSaveCtaWrapper,
  StyledSaveCta,
};
