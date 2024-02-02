import styled from "styled-components";
import Image from "next/image";

type IStyledText = {
  $fontSize: string;
};

const StyledSnackbarContainer = styled.div`
  position: relative;
  z-index: 10;
  width: auto;
  height: 85px;
  border-radius: 80px;
  margin-top: 30px;
  border: 3px solid ${({ theme }) => theme.palette.primary.light};
  background: ${({ theme }) => theme.palette.primary.dark};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  z-index: 1052;
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 85%;
    height: 66px;
  }
`;
const StyledUserAvatar = styled.div`
  width: 65px;
  height: 65px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    left: 6px;
  }
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

const StyledContent = styled.div`
  left: 104px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: 70px;
  }
`;

const StyledText = styled.span<IStyledText>`
  font-size: ${(props) => props.$fontSize};
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
`;
const StyledMessage = styled.p`
  color: ${({ theme }) => theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 200px;
  }
`;

export {
  StyledSnackbarContainer,
  StyledUserAvatar,
  StyledAvatarImage,
  StyledContent,
  StyledText,
  StyledMessage,
};
