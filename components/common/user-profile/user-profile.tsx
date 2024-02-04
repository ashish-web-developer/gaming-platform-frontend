import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledWrapper,
  StyledHeader,
  StyledBackButton,
  StyledHeaderText,
  StyledChatProfileContent,
  StyledProfileWrappper,
  StyledUserProfile,
  StyledUploadButton,
  StyledPointsTag,
  StyledPointsImage,
  StyledPointsText,
  StyledUserDetailsWrapper,
  StyledName,
  StyledUserNameWrapper,
  StyledUserName,
} from "@/styles/components/common/user-profile/user-profile.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  mode,
  show_profile_upload_modal,
  updateShowUserProfile,
  updateShowProfileUploadModal,
} from "@/store/slice/common.slice";

// local components
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const BackIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M12.576 19.895l-1.084 1.084a1.167 1.167 0 01-1.656 0L.344 11.492a1.167 1.167 0 010-1.656L9.836.344a1.167 1.167 0 011.656 0l1.084 1.084c.463.464.454 1.22-.02 1.675L6.672 8.709h14.034c.649 0 1.171.522 1.171 1.171v1.563c0 .65-.522 1.172-1.171 1.172H6.672l5.884 5.605c.479.454.488 1.211.02 1.675z"
      ></path>
    </svg>
  );
};

const UploadIcon: FC<{
  width: number;
  height: number;
  color: string;
  stroke: string;
}> = ({ width, height, color, stroke }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 30 25"
    >
      <path
        fill={color}
        stroke={stroke}
        d="M7.969 4.071h.34l.125-.317.72-1.836C9.486 1.078 10.343.5 11.32.5h7.354c.978 0 1.835.577 2.165 1.418v.001l.727 1.836.125.316h5.497c1.3 0 2.312 1 2.312 2.179v16.071c0 1.18-1.013 2.179-2.313 2.179H2.813C1.512 24.5.5 23.501.5 22.321V6.25c0-1.18 1.013-2.179 2.313-2.179h5.156zM22.53 14.286c0-3.993-3.4-7.197-7.531-7.197-4.132 0-7.531 3.204-7.531 7.197s3.4 7.196 7.531 7.196c4.132 0 7.531-3.203 7.531-7.196zm-2.875 0c0 2.407-2.067 4.41-4.656 4.41-2.589 0-4.656-2.003-4.656-4.41 0-2.408 2.067-4.411 4.656-4.411 2.589 0 4.656 2.003 4.656 4.41z"
      ></path>
    </svg>
  );
};

const ChatProfile: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  const _user = useAppSelector(user);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const upload_cta_ref = useRef<HTMLButtonElement>(null);
  return (
    <StyledWrapper>
      {_show_profile_upload_modal && (
        <UploadProfileModal ref={upload_cta_ref} />
      )}
      <StyledHeader>
        <StyledBackButton
          onClick={() => {
            dispatch(updateShowUserProfile(false));
          }}
        >
          <BackIcon size={22} color={theme.palette.primary.main} />
        </StyledBackButton>
        <StyledHeaderText>Gamer Profile</StyledHeaderText>
      </StyledHeader>
      <StyledChatProfileContent>
        <StyledProfileWrappper $mode={_mode}>
          <StyledUserProfile
            sizes="(max-width: 1400px) 10vw"
            src={user_avatar_url}
            fill={true}
            alt="profile"
          />
          <StyledUploadButton
            ref={upload_cta_ref}
            onClick={() => {
              dispatch(updateShowProfileUploadModal(true));
            }}
          >
            <UploadIcon
              width={30}
              height={25}
              color={theme.palette.primary.dark}
              stroke={
                _mode == "dark"
                  ? theme.palette.primary.main
                  : theme.palette.primary.main
              }
            />
          </StyledUploadButton>
          <StyledPointsTag>
            <StyledPointsImage
              width={20}
              height={20}
              alt="points icon"
              src="/common/user-profile/dollar.png"
            />
            <StyledPointsText $mode={_mode}>800.00</StyledPointsText>
          </StyledPointsTag>
        </StyledProfileWrappper>
      </StyledChatProfileContent>
      <StyledUserDetailsWrapper>
        <StyledName>{_user.name}</StyledName>
        <StyledUserNameWrapper $mode={_mode}>
          <StyledUserName>@{_user.username}</StyledUserName>
        </StyledUserNameWrapper>
      </StyledUserDetailsWrapper>
    </StyledWrapper>
  );
};
export default ChatProfile;
