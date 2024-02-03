import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
// types
import { type FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

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
  StyledText,
  StyledUserPointsContainer,
  StyledNotificationContainer,
} from "@/styles/components/chat/chat-header/chat-header.style";

// local components
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { mode, updateShowProfileUploadModal } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

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
  const dispatch = useAppDispatch();
  const [is_mount, setIsMount] = useState<boolean>(false);
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const user_avatar_ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <>
      {is_mount &&
        createPortal(
          <UploadProfileModal ref={user_avatar_ref} />,
          document.getElementById("upload-profile-modal-container") as Element
        )}
      <StyledChatHeader>
        <StyledWelcomeText>
          Welcome Gaming, <StyledSpan>Buddy</StyledSpan>
        </StyledWelcomeText>
        <StyledRightContainer>
          <StyledUserProfileContainer>
            <StyledUserImgContainer
              ref={user_avatar_ref}
              onClick={() => {
                dispatch(updateShowProfileUploadModal(true));
              }}
              $mode={_mode}
            >
              <StyledUserImg
                $mode={_mode}
                src={user_avatar_url}
                width={40}
                height={40}
                alt="user-avatar"
              />
            </StyledUserImgContainer>
            <StyledUserData>
              <StyledText $mode={_mode}>{_user.name}</StyledText>
              <StyledUserPointsContainer>
                <Image
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
                <StyledText $mode={_mode}>300.00</StyledText>
              </StyledUserPointsContainer>
            </StyledUserData>
          </StyledUserProfileContainer>
          <StyledNotificationContainer $mode={_mode}>
            <NotificationIcon width={22} height={25} color="#000" />
          </StyledNotificationContainer>
        </StyledRightContainer>
      </StyledChatHeader>
    </>
  );
};

export default ChatHeader;
