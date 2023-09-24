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
  border: 3px solid #ff2400;
  background: #080f0f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
  }
`;
const StyledUserAvatar = styled.div`
  position: absolute;
  width: 75px;
  height: 75px;
  background-color: ${({ theme }) => theme.palette.secondary.red};
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
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
`;

export { StyledSnackbarContainer, StyledUserAvatar, StyledContent, StyledText };
