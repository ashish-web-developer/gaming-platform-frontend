import styled from "styled-components";
import Image from "next/image";

const StyledMobileActionNav = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  left: 0px;
  top: 50%;
  z-index: 4;
`;
const StyledVectorContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translateY(-50%);
`;

const StyledContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6px;
  width: 50px;
  height: 206px;
  background: transparent;
  gap: 1.5rem;
  transform: translateY(-50%);
`;

const StyledCta = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

export {
  StyledMobileActionNav,
  StyledVectorContainer,
  StyledContent,
  StyledCta,
  StyledImage,
};
