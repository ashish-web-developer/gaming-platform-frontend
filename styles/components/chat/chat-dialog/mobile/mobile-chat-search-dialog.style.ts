import styled from "styled-components";

const StyledDialogContainer = styled.dialog`
  position: absolute;
  z-index: 2;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 355px;
  border: none;
  border-radius: 16px;
  background: transparent;
`;

export { StyledDialogContainer };
