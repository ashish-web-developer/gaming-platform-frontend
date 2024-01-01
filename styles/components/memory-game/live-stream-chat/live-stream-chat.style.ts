import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 350px;
  width: 100%;
  background: #000;
  z-index: 10;
  border: 3px solid #fff;
  border-radius: 25px 25px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;
const StyledDivider = styled.div`
  width: 60px;
  height: 3px;
  background: #fff;
`;
const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0px;
`;
const StyledMainText = styled.div`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledCloseIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StyledMessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 126px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: auto;
`;

const StyledMessageInputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 2px solid #fff;
  background: transparent;
  padding-left: 18px;
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  &::placeholder {
    color: #fff;
  }
`;
const StyledSendCta = styled.button`
  background: transparent;
  border: none;
  display: flex;
`;
const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StyledProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StyledUserProfile = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid #fff;
  border-radius: 50%;
`;
const StyledMessageUserName = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledMessage = styled.p`
  color: #ded1d1;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export {
  StyledContainer,
  StyledDivider,
  StyledHeader,
  StyledMainText,
  StyledCloseIcon,
  StyledMessagesContainer,
  StyledMessageInputContainer,
  StyledInput,
  StyledSendCta,
  StyledMessageContainer,
  StyledProfileContainer,
  StyledUserProfile,
  StyledMessageUserName,
  StyledMessage,
};
