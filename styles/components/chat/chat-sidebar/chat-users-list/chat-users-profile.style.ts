import styled from "styled-components";

const StyledUsersProfile = styled.div`
  width: 100%;
  min-height: 64px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.primary.info};
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 15px;
`;

const StyledUserImage = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 8px;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserName = styled.span`
  color: #000;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledUserMessage = styled.span`
  color: #40434e;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export {
  StyledUsersProfile,
  StyledUserImage,
  StyledUserDetails,
  StyledUserName,
  StyledUserMessage,
};
