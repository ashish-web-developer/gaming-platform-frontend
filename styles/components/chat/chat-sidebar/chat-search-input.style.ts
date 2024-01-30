import styled from "styled-components";

import Image from "next/image";

const StyledChatSearchInputContainer = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 64px;
  }
`;

const StyledChatSearchInput = styled.input<{
  $mode: "light" | "dark";
}>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  padding-left: 18px;
  z-index: 1;
  &:focus {
    outline: none;
  }
  &::focus {
    outline: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
  }
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return `
            background:${props.theme.palette.primary.main};
            border:2px solid ${props.theme.palette.primary.dark};
            color:${props.theme.palette.primary.light};
            &::placeholder {
              color:${props.theme.palette.primary.light};
            }
          `;
      case "light":
        return `
            background:${props.theme.palette.secondary.main};
            border:2px solid ${props.theme.palette.primary.dark};
            color:${props.theme.palette.primary.dark};
            &::placeholder {
              color:${props.theme.palette.primary.dark};
            }
          `;
    }
  }}
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
