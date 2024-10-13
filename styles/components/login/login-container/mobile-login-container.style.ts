import styled from "styled-components";

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

const StyledLogo = styled.h2`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.palette.primary.light};
  transform: rotate(-5deg);
  top: 3rem;
  left: 3rem;
`;

const StyledUploadModalWrapper = styled.div<{
  $is_modal_open: boolean;
}>`
  ${(props) =>
    props.$is_modal_open &&
    `
    position:absolute;
    width:100%;
    height:100vh;
    background:transparent;
    z-index:3;
    top:0px;
    left:0px;
    overflow:hidden;
  `}
`;
export { StyledPage, StyledUploadModalWrapper, StyledLogo };
