// types
import { type FC } from "react";

// styled components
import {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileContainer,
  StyledUserImgContainer,
  StyledUserImg,
  StyledUserData,
  StyledUserName,
  StyledMoneyBagImg,
  StyledUserPointsContainer,
  StyledUserPoints,
  StyledNotificationContainer,
} from "@/styles/components/chat/chat-header/chat-header.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import useAvatar from "@/hooks/profile";

import React from "react";

const NotificationIcon: FC<{
  width: number;
  height: number;
  color: string;
}> = ({ width, height, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 25"
    >
      <path
        fill={color}
        d="M10.938 25a3.124 3.124 0 003.123-3.125H7.814A3.124 3.124 0 0010.937 25zm10.517-7.31c-.944-1.014-2.709-2.539-2.709-7.534 0-3.794-2.66-6.83-6.247-7.576V1.562a1.562 1.562 0 10-3.123 0V2.58c-3.587.745-6.247 3.782-6.247 7.576 0 4.995-1.765 6.52-2.709 7.534A1.526 1.526 0 000 18.75c.005.8.634 1.563 1.567 1.563h18.74c.934 0 1.563-.762 1.568-1.563a1.524 1.524 0 00-.42-1.06z"
      ></path>
    </svg>
  );
};

const ChatHeader: FC = () => {
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  const _user_avatar = useAvatar(_user?.username ?? "");
  return (
    <StyledChatHeader>
      <StyledWelcomeText>
        Welcome Gaming, <StyledSpan>Buddy</StyledSpan>
      </StyledWelcomeText>
      <StyledRightContainer>
        <StyledUserProfileContainer>
          <StyledUserImgContainer>
            <StyledUserImg
              dangerouslySetInnerHTML={{
                __html: _user_avatar,
              }}
            />
          </StyledUserImgContainer>
          <StyledUserData>
            <StyledUserName>{_user.name}</StyledUserName>
            <StyledUserPointsContainer>
              <StyledMoneyBagImg
                alt="money bag"
                src={
                  "/chat/chat-header/" +
                  (_mode == "light"
                    ? "money-bag-light.png"
                    : "money-bag-dark.png")
                }
                width={15}
                height={15}
              />
              <StyledUserPoints>300.00</StyledUserPoints>
            </StyledUserPointsContainer>
          </StyledUserData>
        </StyledUserProfileContainer>
        <StyledNotificationContainer>
          <NotificationIcon width={22} height={25} color="#000" />
        </StyledNotificationContainer>
      </StyledRightContainer>
    </StyledChatHeader>
  );
};

export default ChatHeader;
