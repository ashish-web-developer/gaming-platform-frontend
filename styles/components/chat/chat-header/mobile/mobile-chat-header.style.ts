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
  top: 10px;
  cursor: pointer;
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

const StyledBackCta = styled.button`
  width: 60px;
  height: 60px;
  background: ${({theme})=>theme.palette.back_button.background};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledChatUserProfile = styled.div`
  height: 50px;
  width: auto;
  border-radius: 25px;
  background: ${({theme})=>theme.palette.active_user_profile.background};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px;
  gap: 12px;
  padding-right: 24px;
  border:2px solid ${({theme})=>theme.palette.active_user_profile.border};
`;

const StyledAvatar = styled.span`
  display: inline-block;
  border-radius: 40px;
  border: 2px solid ${({theme})=>theme.palette.active_user_profile.text_main};
  width: 40px;
  height: 40px;
`;

const StyledUserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledUserName = styled.span`
  color: ${({theme})=>theme.palette.active_user_profile.text_main};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledMessageCount = styled.span`
  color:${({theme})=>theme.palette.active_user_profile.text_secondary};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export {
  StyledMobileHeaderContainer,
  StyledMobileHeader,
  StyledMobileChatSearchIcon,
  StyledHamBurgerIcon,
  StyledWelcomingText,
  StyledWelcomingSpan,
  StyledBackCta,
  StyledChatUserProfile,
  StyledAvatar,
  StyledUserDetails,
  StyledUserName,
  StyledMessageCount,
};
