// mui
import { IconButton } from "@mui/material";

// styled
import styled from "styled-components";

const StyledMobileNav = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
    position: absolute;
    bottom: 0px;
    width: 90%;
    z-index: 5;
    height: 50px;
  }
`;

const StyledPattern = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0px;
  width: 100%;
`;

const StyledIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 30px;
  width: 100%;
  padding: 0px 4rem;
`;
const StyledNavCta = styled(IconButton)`
  padding: 0px;
  margin: 0px;
`;
const StyledHelpCta = styled(IconButton)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`;

export {
  StyledMobileNav,
  StyledPattern,
  StyledIconContainer,
  StyledNavCta,
  StyledHelpCta,
};
