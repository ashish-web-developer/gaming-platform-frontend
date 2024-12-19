import styled from "styled-components";
import Image from "next/image";

const StyledPokerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledUserProfile = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.palette.info.main};
  overflow: hidden;
`;
const StyledUserProfileImage = styled(Image)`
  object-fit: cover;
  object-position: top;
`;
export {
  StyledPokerHeader,
  StyledUserProfile,
  StyledUserProfileImage,
};
