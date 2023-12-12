import styled from "styled-components";

import Image from "next/image";

const StyledChatSearchInputContainer = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    height: 100%;
  }
`;

const StyledChatSearchInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.searchbar.background};
  border: ${({ theme }) => theme.palette.searchbar.border};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  padding-left: 18px;
  color: ${({ theme }) => theme.palette.primary.info};
  z-index: 1;
  &::placeholder {
    color: ${({ theme }) => theme.palette.primary.info};
  }
  &:focus {
    outline: none;
  }
  &::focus {
    outline: none;
  }
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    border: 2px solid #000;
    font-size: 18px;
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
