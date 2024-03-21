import styled from "styled-components";
import Image from "next/image";

const StyledSearchDialog = styled.dialog`
  position: absolute;
  top: 191px;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  width: calc(100% - 2.4rem);
  z-index: 6;
  max-height: 400px;
`;
const StyledSearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
`;
const StyledSearchInput = styled.input<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  padding: 0px 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1rem;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  }
`;
const StyledSearchIcon = styled.span`
  position: absolute;
  display: inline-block;
  width: 40px;
  height: 40px;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  right: 1.125rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;
export {
  StyledSearchDialog,
  StyledSearchInputWrapper,
  StyledSearchInput,
  StyledSearchIcon,
  StyledImage,
};
