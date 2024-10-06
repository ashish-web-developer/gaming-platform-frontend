import styled from "styled-components";
import Image from "next/image";

const StyledProfileContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  min-height: 64px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.secondary.main};
  border: 2px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.secondary.main};
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 15px;
`;
const StyledProfileImageWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
`;
const StyledProfileImage = styled(Image)`
  object-fit: cover;
  object-position: top;
`;

const StyledProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  color: #000;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledUserName = styled.span`
  color: #40434e;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
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
  StyledProfileContainer,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
  StyledSkeletonLoader,
};
