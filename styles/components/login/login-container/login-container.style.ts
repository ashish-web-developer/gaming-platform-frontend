import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: red;
  background: url("login/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContentContainer = styled.div`
  width: 75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const StyledLogoContainer = styled.div`
  position: absolute;
  left: 5rem;
  top: 5rem;
`;

const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: 2rem;
  line-height: 1;
`;

const StyledUploadModalWrapper = styled.div<{
  $is_modal_open: boolean;
}>`
  ${(props) =>
    props.$is_modal_open &&
    `
    position:absolute;
    width:100%;
    height:100%;
    background:transparent;
    z-index:3;
  `}
`;

export {
  StyledPage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledUploadModalWrapper,
};
