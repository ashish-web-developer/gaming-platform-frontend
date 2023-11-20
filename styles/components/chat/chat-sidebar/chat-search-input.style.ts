import styled from "styled-components";

import Image from "next/image";

const StyledChatSearchInputContainer = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
`;

const StyledChatSearchInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 54px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.primary.green};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  padding-left: 18px;
  color: #fff;
  z-index: 1;
  &::placeholder {
    color: #fff;
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
  &::focus {
    outline: none;
  }
`;
const StyledInputIcon = styled(Image)`
  position: absolute;
  z-index: 2;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
`;

export {
  StyledChatSearchInputContainer,
  StyledChatSearchInput,
  StyledInputIcon,
};
