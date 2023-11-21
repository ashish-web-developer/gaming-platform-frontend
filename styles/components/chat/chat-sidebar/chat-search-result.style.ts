import styled from "styled-components";

const StyledChatSearchResult = styled.div`
  width: 100%;
  height: auto;
  border: 3px solid ${({ theme }) => theme.palette.primary.green};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: scroll;
  max-height: 277px;
  position: absolute;
  margin-top: 14px;
  z-index: 2;
  background: ${({ theme }) => theme.palette.primary.main};
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

const StyledSkeletonLoader = styled.div`
  width: 100%;
  min-height: 64px;
  background: linear-gradient(-90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  border-radius: 16px;
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export {
  StyledChatSearchResult,
  StyledProfileContainer,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
  StyledSkeletonLoader,
};
