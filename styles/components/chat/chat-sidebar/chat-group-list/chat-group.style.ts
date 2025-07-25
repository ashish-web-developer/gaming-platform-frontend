import Image from "next/image";
import styled from "styled-components";

const StyledChatGroupWrapper = styled.div<{
  $group_color: string;
  $is_active: boolean;
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: auto;
  background: ${(props) => props.$group_color};
  border-radius: 16px;
  flex-shrink: 0;
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return `
          border: 2px solid ${
            props.$is_active ? props.theme.palette.primary.dark : "#000"
          };
        `;
      case "light":
        return `
          border: 2px solid ${
            props.$is_active ? props.theme.palette.primary.light : "#000"
          };
        `;
    }
  }}
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
  justify-content: space-between;
`;

const StyledLeftWrapper = styled.div`
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
  overflow: hidden;
`;

const StyledAdminProfileImage = styled(Image)`
  object-fit: cover;
  object-position: top;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const StyledFollowCta = styled.button`
  background: transparent;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #000;
  font-size: 14px;
  border: 1.5px solid #000;
  border-radius: 8px;
  padding: 4px 18px;
  cursor: pointer;
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
  line-height: 1;
`;

const StyledGroupCreationDate = styled.span`
  color: #40434e;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  line-height: 1;
`;

const StyledGroupAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledGroupMessage = styled.p`
  color: #40434e;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 12px;
  white-space: nowrap;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

export {
  StyledChatGroupWrapper,
  StyledChatGroupContent,
  StyledWrapperTop,
  StyledLeftWrapper,
  StyledAdminProfile,
  StyledAdminProfileImage,
  StyledUserDetails,
  StyledFollowCta,
  StyledDivider,
  StyledGroupName,
  StyledGroupCreationDate,
  StyledWrapperBottom,
  StyledGroupAvatar,
  StyledGroupMessage,
};
