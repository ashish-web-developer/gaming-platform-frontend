import styled from "styled-components";
import Image from "next/image";

const StyledPlayerSearchWrapper = styled.div`
  width: 100%;
  height: 280px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  position: absolute;
  width: 88%;
  top: 250px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 16px;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  padding: 0 0.875rem;
  height: 55px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledGroupAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0.875rem;
  height: calc(100% - 105px);
  overflow: scroll;
`;

const StyledProfileContainer = styled.div`
  height: 50px;
  width: 100%;
  max-width: 240px;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  flex-shrink: 0;
  border: 1.5px solid #000;
`;
const StyledProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledProfileImageWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1.5px solid #000;
  position: relative;
`;

const StyledProfileImage = styled(Image)`
  object-fit: cover;
`;
const StyledProfileDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  justify-content: center;
`;
const StyledName = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #000;
  font-size: 0.875rem;
  line-height: 1;
`;

const StyledUserName = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #000;
  font-size: 0.75rem;
  line-height: 1;
`;
const StyledCheckboxWrapper = styled.div``;
const StyledCheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid #000;
  position: relative;
`;
const StyledLabelImage = styled(Image)`
  display: none;
`;

const StyledCheckBox = styled.input`
  display: none;
  &:checked + ${StyledCheckBoxLabel} {
    background: #afa2ff;
    & img {
      display: block;
    }
  }
`;

const StyledBottomContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 0.875rem;
  border-top: 2px solid ${({ theme }) => theme.palette.primary.dark};
`;

const StyledInviteCta = styled.button`
  padding: 6px 20px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background: linear-gradient(95deg, #ffe666 8.66%, #fb3 95.1%);
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  cursor: pointer;
`;

export {
  StyledPlayerSearchWrapper,
  StyledHeader,
  StyledGroupAvatar,
  StyledProfileListWrapper,
  StyledProfileContainer,
  StyledProfileWrapper,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetailsWrapper,
  StyledName,
  StyledUserName,
  StyledCheckboxWrapper,
  StyledCheckBoxLabel,
  StyledLabelImage,
  StyledCheckBox,
  StyledBottomContainer,
  StyledInviteCta,
};
