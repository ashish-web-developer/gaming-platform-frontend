import Image from "next/image";
import styled from "styled-components";

const StyledChatUserUploadWrapper = styled.dialog<{
  $secondary_color: string;
  $font_family: string;
}>`
  width: 90%;
  max-width: 300px;
  background: ${({ theme }) => theme.palette.primary.main};
  position: relative;
  z-index: 6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%) perspective(800px);
  border-radius: 16px;
  border: 2px solid ${(props) => props.$secondary_color};
  font-family: ${(props) => props.$font_family};
  padding-bottom: 1.5rem;
`;

const StyledGirlImageWrapper = styled.div`
  position: absolute;
  width: 432px;
  height: 243px;
  top: -100px;
  left: -20px;
`;
const StyledGirlImage = styled(Image)`
  object-fit: contain;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const StyledHeaderMainText = styled.h6<{
  $secondary_color: string;
}>`
  color: ${(props) => props.$secondary_color};
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1;
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledModalContent = styled.div`
  width: 100%;
  padding: 0px 1.5rem;
`;

const StyledUploadInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledUploadLabel = styled.label<{
  $secondary_color: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 245px;
  border: 2px dashed ${(props) => props.$secondary_color};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.primary.main};
`;
const StyledUploadedImage = styled(Image)`
  object-fit: cover;
`;
const StyledUploadInput = styled.input`
  width: 100%;
  display: none;
`;

const StyledUploadBottomInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledText = styled.p<{
  $secondary_color: string;
}>`
  color: ${(props) => props.$secondary_color};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
`;

const StyledCtaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const StyledSaveCta = styled.button<{
  $secondary_color: string;
  $font_family: string;
}>`
  width: auto;
  height: auto;
  border: 2px solid ${(props) => props.$secondary_color};
  background: linear-gradient(95deg, #ffe666 8.66%, #fb3 95.1%);
  padding: 6px 24px;
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  border-radius: 5px;
  cursor: pointer;
  font-family: ${(props) => props.$font_family};
`;

export {
  StyledChatUserUploadWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
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
  StyledCtaWrapper,
  StyledSaveCta,
};
