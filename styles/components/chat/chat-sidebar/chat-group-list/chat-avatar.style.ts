import styled from "styled-components";
import Image from "next/image";

const StyledAvatarWrapper = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #000;
  overflow: hidden;
  background: red;
  &:not(:first-of-type) {
    margin-left: -14px;
  }
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
`;

export { StyledAvatarWrapper, StyledAvatarImage };
