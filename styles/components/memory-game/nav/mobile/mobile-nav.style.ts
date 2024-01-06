// styled
import styled from "styled-components";

type IStyledChatButton = {
  $content: string;
};

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
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
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
const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledChatButton = styled.button<IStyledChatButton>`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${(props) =>
    props.$content &&
    `
    &::after{
      content:"${props.$content}";
      position:absolute;
      width:25px;
      height:25px;
      background:#F42C04;
      border-radius:50%;
      border:2px solid #fff;
      bottom:12px;
      left:12px;
      display:flex;
      justify-content:center;
      align-items:center;
      color: #FFF;
      font-family: Poppins;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: uppercase;
    }
  `}
`;

export {
  StyledNavContainer,
  StyledNav,
  StyledHelpCta,
  StyledIconButton,
  StyledChatButton,
};
