import styled from "styled-components";
import Image from "next/image";

const StyledPokerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLogo = styled.h1`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-family: ${({ theme }) => theme.fontFamily.rubik_glitch};
  letter-spacing: 1px;
`;
const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.625rem;
`;
const StyledUserProfile = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  overflow:hidden;
`;
const StyledUserProfileImage = styled(Image)`
  object-fit: cover;
`;
export {
  StyledPokerHeader,
  StyledLogo,
  StyledRightContainer,
  StyledUserProfile,
  StyledUserProfileImage,
};
