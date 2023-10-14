import styled from "styled-components";

type IStyledText = {
  $fontSize: string;
};

const StyledSnackbarContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 398px;
  height: 85px;
  border-radius: 80px;
  margin-top: 30px;
  border-radius: 80px;
  border: 3px solid ${({ theme }) => theme.palette.info_snackbar.border_color};
  background: ${({ theme }) => theme.palette.info_snackbar.background};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  z-index: 1052;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 90%;
  }
`;
const StyledUserAvatar = styled.div`
  position: absolute;
  width: 75px;
  height: 75px;
  background-color: ${({ theme }) =>
    theme.palette.info_snackbar.profile_background};
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.palette.main};
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledContent = styled.div`
  position: absolute;
  left: 104px;
`;

const StyledText = styled.p<IStyledText>`
  font-size: ${(props) => props.$fontSize};
  color: ${({ theme }) => theme.palette.info_snackbar.text_color};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
`;

export { StyledSnackbarContainer, StyledUserAvatar, StyledContent, StyledText };
