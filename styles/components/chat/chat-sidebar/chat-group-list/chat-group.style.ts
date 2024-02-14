import Image from "next/image";
import styled from "styled-components";

const StyledChatGroupWrapper = styled.div<{
  $group_color: string;
}>`
  width: 100%;
  height: auto;
  background: ${(props) => props.$group_color};
  border-radius: 16px;
  flex-shrink: 0;
  border: 2px solid #000;
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

const StyledChatGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledWrapperTop = styled.div`
  padding: 0.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledAdminProfile = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 6px;
  position: relative;
`;

const StyledAdminProfileImage = styled(Image)`
  object-fit: cover;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledDivider = styled.div`
  height: 2px;
  width: calc(100% - 1.5rem);
  background: #000;
`;

const StyledWrapperBottom = styled.div`
  padding: 0.75rem;
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
`;

const StyledGroupName = styled.h5`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 14px;
`;

const StyledGroupCreationDate = styled.span`
  color: #40434e;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
`;

const StyledGroupAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledGroupMessage = styled.p`
  color: #40434e;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 12px;
`;

export {
  StyledChatGroupWrapper,
  StyledChatGroupContent,
  StyledWrapperTop,
  StyledAdminProfile,
  StyledAdminProfileImage,
  StyledUserDetails,
  StyledDivider,
  StyledGroupName,
  StyledGroupCreationDate,
  StyledWrapperBottom,
  StyledGroupAvatar,
  StyledGroupMessage,
};
