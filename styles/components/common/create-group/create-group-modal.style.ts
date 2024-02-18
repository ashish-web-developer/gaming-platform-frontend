import styled from "styled-components";

const StyledCreateGroupModalWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 309px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  color: white;
  top: calc(100% + 1rem);
  right: 0px;
  padding: 1.125rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledHeaderMainText = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
`;

const StyledHeaderSubtitle = styled.p`
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.secondary.dark};
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export {
  StyledCreateGroupModalWrapper,
  StyledHeader,
  StyledTextWrapper,
  StyledHeaderMainText,
  StyledHeaderSubtitle,
  StyledIconButton,
};
