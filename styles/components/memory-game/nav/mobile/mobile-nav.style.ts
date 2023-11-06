// mui
import { IconButton } from "@mui/material";

// styled
import styled from "styled-components";

const StyledNavContainer = styled.div`
  position: fixed;
  z-index: 6;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  gap: 20px;
`;

const StyledNav = styled.div`
  width: 190px;
  height: 52px;
  background: ${({ theme }) => theme.palette.nav.mobile.background};
  border-radius: 25px;
  border: ${({ theme }) => theme.palette.nav.mobile.border};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StyledHelpCta = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #f42c04;
  border: ${({ theme }) => theme.palette.nav.mobile.help_tooltip_border};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export { StyledNavContainer, StyledNav, StyledHelpCta };
