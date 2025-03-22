import styled from "styled-components";
import Image from "next/image";

const StyledPokerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLogoWrapper = styled.div`
  & > :first-child {
    position: relative;
    z-index: 2;
  }
`;
const StyledCardWrapper = styled.div`
  position: absolute;
  top: 0px;
  display: grid;
  grid-template-columns: repeat(2, 30px);
  & > :first-child {
    rotate: -8deg;
  }
  & > :last-child {
    rotate: 8deg;
    left: -20px;
  }
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
  StyledLogoWrapper,
  StyledCardWrapper,
  StyledUserProfile,
  StyledUserProfileImage,
};
