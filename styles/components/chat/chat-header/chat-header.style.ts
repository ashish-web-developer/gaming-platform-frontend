import styled from "styled-components";
import Image from "next/image";

const StyledChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const StyledWelcomeText = styled.div`
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: Lobster;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledSpan = styled.span`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledUserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledUserImgContainer = styled.span`
  background: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.palette.primary.info};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledUserImg = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.primary.info};
`;

const StyledUserData = styled.span`
  display: flex;
  flex-direction: column;
`;

const StyledUserName = styled.span`
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledUserPointsContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledMoneyBagImg = styled(Image)``;

const StyledUserPoints = styled.span`
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledNotificationContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.palette.primary.info};
  background: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileContainer,
  StyledUserImgContainer,
  StyledUserImg,
  StyledUserData,
  StyledUserName,
  StyledUserPointsContainer,
  StyledUserPoints,
  StyledNotificationContainer,
  StyledMoneyBagImg,
};
