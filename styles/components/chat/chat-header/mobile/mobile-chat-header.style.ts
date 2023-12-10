import styled from "styled-components";

const StyledMobileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;
const StyledMobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledMobileChatSearchIcon = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  border: none;
  margin: 0px;
  padding: 0px;
`;

const StyledHamBurgerIcon = styled.span`
  display: inline-block;
  width: 30px;
  height: 3px;
  background: ${({ theme }) => theme.palette.primary.info};
  position: relative;
  &::before {
    content: "";
    width: 25px;
    height: 3px;
    position: absolute;
    right: 0px;
    top: 10px;
    background: ${({ theme }) => theme.palette.primary.info};
  }
`;

const StyledWelcomingText = styled.h1`
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.info};
  font-size: 30px;
`;
const StyledWelcomingSpan = styled.span`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export {
  StyledMobileHeaderContainer,
  StyledMobileHeader,
  StyledMobileChatSearchIcon,
  StyledHamBurgerIcon,
  StyledWelcomingText,
  StyledWelcomingSpan,
};
