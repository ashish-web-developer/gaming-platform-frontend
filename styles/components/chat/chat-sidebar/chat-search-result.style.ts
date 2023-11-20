import styled from "styled-components";

const StyledChatSearchResult = styled.div`
  width: 100%;
  height: auto;
  border: 3px solid ${({ theme }) => theme.palette.primary.green};
  border-radius: 16px;
  margin-top: 14px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: scroll;
  max-height: 277px;
`;

const StyledProfileContainer = styled.div`
  width: 100%;
  min-height: 64px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.primary.info};
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 15px;
`;

const StyledProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 8px;
`;

const StyledProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  color: #000;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledUserName = styled.span`
  color: #40434e;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export {
  StyledChatSearchResult,
  StyledProfileContainer,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
};
