import Image from "next/image";
import styled from "styled-components";

const StyledChatUserUploadWrapper = styled.dialog`
  width: 90%;
  height: 470px;
  background: #000;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 25px;
  border: 3px solid #a2f263;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const StyledHeaderMainText = styled.h6`
  color: #a2f263;
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
  border: 3px dashed #a2f263;
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
  color: #a2f263;
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
  border: 2px solid #a2f263;
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
