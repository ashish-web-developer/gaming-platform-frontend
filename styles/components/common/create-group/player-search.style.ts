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
  padding: 0.875rem;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
`;

const StyledProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0.875rem;
  height: calc(100% - 52px);
  overflow: scroll;
`;

const StyledProfileWrapper = styled.div`
  height: 50px;
  width: 100%;
  max-width: 240px;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0px 10px;
  flex-shrink: 0;
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

export {
  StyledPlayerSearchWrapper,
  StyledHeader,
  StyledProfileListWrapper,
  StyledProfileWrapper,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetailsWrapper,
  StyledName,
  StyledUserName,
};
